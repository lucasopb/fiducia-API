import { Request, Response } from 'express';
import {CreateUsers, getUsers} from '../../repositories/userRepository';
import { createPriest } from '../../repositories/priestRepository';
import { BadRequestError } from '../../helpers/api-erros';

export const signUp = async (req: Request, res: Response) => {
  const {name, email, password, role, bio, church_name} = req.body
  if (!name || !email || !password || !role) {
    throw new BadRequestError(`Nome, Email, Senha e Papel devem ser fornecidos`);
  }
  if (role == "padre" && !bio) {
    throw new BadRequestError(`quando o papel for padre a bio deve ser fornecida`)
  }
  const user = await CreateUsers(name, email, password, role);
  if (role === "padre") {
    const priestData = {
      user_id: user.id,
      church_id: church_name || null,
      bio: bio ?? "",
    };
    await createPriest(priestData);
  }
  return res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
  });
};

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body
  if (!email || !password) {
    throw new BadRequestError("Email e senha são necessarios")
  }  
}

export const getUsersController = async (req: Request, res: Response) => {
  const allUsers = await getUsers()
  return res.status(201).json(allUsers);
}