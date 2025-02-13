import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["fiel", "padre"]),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;