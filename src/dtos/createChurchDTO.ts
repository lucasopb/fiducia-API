import { z } from "zod";


export const CreateChurchSchema = z.object({
    name: z.string().min(3, "o nome deve conter no minimo 3 caracteres"),
    email: z.string().email(),
    password: z.string().min(6, "senha deve ter no minimo 6 caracteres"),
    address: z.string().min(10, "endereço precesa ter no minimo 10 caracteres"),
    phone: z.string().min(8, "o telefone deve conter pelo menos 8 numeros"),
})


export type CreateChurchDTO = z.infer<typeof CreateChurchSchema>;