import { query } from '../database/database';


export const createPriest = async ({ user_id, church_id, bio }: { user_id: string, church_id?: string | null, bio: string }) => {
      const result = await query(
          `INSERT INTO priests (user_id, church_id, bio) VALUES ($1, $2, $3) RETURNING *;`,
          [user_id, church_id, bio]
      );
      return result.rows[0];
};