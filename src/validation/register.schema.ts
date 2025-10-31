import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.email('Email no valido'),
    password: z.string().min(6, 'Mínimo 6 caracteres')
});

export type RegisterInput = z.infer<typeof registerSchema>;