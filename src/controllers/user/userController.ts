import { Request, Response } from 'express';
import { query } from '../../config/database';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await query('SELECT id, name, email FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const editUsers = async (req: Request, res: Response) => {
  try {
    const id = req.params
    const {name, email, password} = req.body

    const result = await query(
      'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [name, email, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error()
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;  

    const result = await query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
