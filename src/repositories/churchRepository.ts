import { query } from '../database/database';
import { CreateChurchDTO } from "../dtos/createChurchDTO";


export const createChurch = async (church: CreateChurchDTO) => {
    const result = await query(
        `INSERT INTO churches (name, email, password, address, phone)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
        [church.name, church.email, church.password, church.address, church.phone]
    )
    return result.rows[0]
}