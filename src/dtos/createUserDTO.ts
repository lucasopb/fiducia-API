import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["fiel", "padre"]),
  church_name: z.string().optional(),  // Igreja opcional para padres
  bio: z.string().optional() // Biografia opcional para padres
}).refine((data) => {
  if (data.role === "padre" && !data.bio) {
    return false
  }
  return true
},  {
  message: "Padres devem fornecer uma biografia",
  path: ["bio"],
})

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;