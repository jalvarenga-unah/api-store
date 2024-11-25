import { z } from 'zod'


const userSchema = z.object(
    {
        "name": z.string({
            invalid_type_error: "El nombre debe ser un string"
        }).trim().min(3, {
            message: "El nombre debe tener al menos 3 caracteres"
        }),
        "username": z.string().trim().min(5),
        "email": z.string().email({
            message: "El email no es válido"
        }).endsWith('unah.hn', {
            message: "El email debe ser de un estudiante de la UNAH"
        }),
        "phone": z.string().length(8).optional(), // "optional": permite no enviar la propiedad
        "website": z.string().url().optional(), // si quiero que pueda aceptar nulos, uso: nullable
    },
).strict() // valida que no haya campos adicionales


// username, password_hash, email, full_name, role, must_change_password, status
const userSchemaDB = z.object(
    {
        "username": z.string({
            invalid_type_error: "El nombre debe ser un string"
        }).trim().min(3, {
            message: "El nombre debe tener al menos 3 caracteres"
        }),
        "password_hash": z.string().trim(),
        "full_name": z.string().trim(),
        "role": z.enum(['admin', 'editor', 'viewer']),
        "email": z.string().email({
            message: "El email no es válido"
        }).endsWith('unah.hn', {
            message: "El email debe ser de un estudiante de la UNAH"
        }),
        "must_change_password": z.number().min(0).max(1), // "optional": permite no enviar la propiedad
        "status": z.enum(['active', 'inactive']), // si quiero que pueda aceptar nulos, uso: nullable
    },
).strict()


export const validateUserSchema = (user) => userSchema.safeParse(user)

export const validateUserSchemaDB = (user) => userSchemaDB.safeParse(user)

export const validatePartialSchema = (user) => userSchema.partial().safeParse(user)