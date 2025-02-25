import { query } from '../database/database';
import { ConflictError } from '../helpers/api-erros';


export const CreateUsers = async (name: string, email: string, password: string, role: string) => {
  const existingUser = await query(
    "SELECT email, password FROM users WHERE email = $1 OR password = $2",
    [email, password]
  );
  if (existingUser.rows.length > 0) {
    const { bdEmail, bdPassword } = existingUser.rows[0];
    if (bdEmail == email) {
      throw new ConflictError("Email in use")
    }
    if (bdPassword == password) {
      throw new ConflictError("Password in use")
    }
  }
  const result = await query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role]
  );
  return result.rows[0];
};

export const getUsers = async () => {
  const result = await query('SELECT * FROM users');
  return result.rows
}

export const editUser = async (name: string, email: string, password: string, id: string) => {
  const result = await query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
    [name, email, password, id]
  );
  return result.rows[0]
}

export const deleteUser = async (id: string) => {
  const result = await query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0]
}