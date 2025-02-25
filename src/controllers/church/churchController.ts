import { Request, Response } from 'express';
import { createChurch } from "../../repositories/churchRepository"
import { BadRequestError } from '../../helpers/api-erros';


export const createChurchController = async (req: Request, res: Response) => {
    const {name, email, password, address, phone} = req.body
    if (!name || !email || !password || !address || !phone) {
        throw new BadRequestError("nome, email, senha, endereço e telefone devem ser fornecidos")
    }
    const church = await createChurch(name, email, password, address, phone);
    res.status(201).json(church);
}

