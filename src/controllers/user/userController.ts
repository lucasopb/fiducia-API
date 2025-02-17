import { Request, Response } from 'express';
import {CreateUsers, getUsers, editUser, deleteUser} from '../../repositories/userRepository';
import { createPriest } from '../../repositories/priestRepository';
import { CreateUserSchema } from '../../dtos/createUserDTO';




export const createUserController = async (req: Request, res: Response) => {
  try {
    const validatedData = CreateUserSchema.parse(req.body);
    const user = await CreateUsers(validatedData);
    // Se o usuário for um padre, criar registro na tabela `priests`
    if (validatedData.role === 'padre') {
      const priestData = {
        user_id: user.id,
        church_id: validatedData.church_name || null, //validar nome
        bio: validatedData.bio ?? "",
      };
      await createPriest(priestData);
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const result = await getUsers()
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const editUsersController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {name, email, password} = req.body
  try {
    const result = await editUser(name, email, password, id);
    if (!result) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error()
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;  
  try {
    const result = await deleteUser(id)
    if (!result) {
      res.status(404).json({ error: 'Usuário não encontrado' })
      return;
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
