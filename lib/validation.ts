import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe conter mínimo 2 caracteres." })
    .max(50, { message: "El nombre debe conter máximo 50 caracteres." }),
  email: z.string().email("Correo Electrónico incorrecto."),
  phone: z.string().refine((phone) => /^\d{10,15}$/.test(phone), 'Número de teléfono incorrecto'),
});
