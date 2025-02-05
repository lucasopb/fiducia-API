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
