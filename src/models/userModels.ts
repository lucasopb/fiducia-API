import { query } from '../config/database';


export const CreateUsers = async (name: string, email: string, password: string) => {
    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    return result.rows[0]
}

export const getUsers = async () => {
    const result = await query('SELECT * FROM users');
    return result.rows
}

export const editUser = async (name: string, email:string, password:string, id:string) => {
    const result = await query(
      'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [name, email, password, id]
    );
    return result.rows[0]
}

export const deleteUser = async (id:string) => {
    const result = await query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0]
}