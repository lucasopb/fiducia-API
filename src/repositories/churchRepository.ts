import { query } from '../database/database';


export const createChurch = async (name:string, email:string, password: string, address: string, phone: string) => {
    const result = await query(
        `INSERT INTO churches (name, email, password, address, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
        [name, email, password, address, phone]
    )
    return result.rows[0]
}