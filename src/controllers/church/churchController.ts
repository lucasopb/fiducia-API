import { Request, Response } from 'express';
import { CreateChurchSchema } from "../../dtos/createChurchDTO"
import { createChurch } from "../../repositories/churchRepository"

export const createChurchController = async (req: Request, res: Response) => {
    try {
        const validatedData = CreateChurchSchema.parse(req.body);
        const church = await createChurch(validatedData);
        res.status(201).json(church);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'erro ao criar igreja'});
    }
}