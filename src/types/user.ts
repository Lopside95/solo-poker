import { Role } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type Login = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
