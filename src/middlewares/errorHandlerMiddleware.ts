import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(`[ERROR] ${req.method} ${req.url} -`, err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Erro de validação",
      errors: err.format(),
    });
  }

  if (err.code === "23505") { // Erro de chave duplicada no PostgreSQL
    return res.status(400).json({
      success: false,
      message: "Esse email já está cadastrado",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
};
