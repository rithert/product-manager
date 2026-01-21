import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100, "El nombre no puede exceder 100 caracteres"),
    sku: z
        .string()
        .min(1, "El SKU es requerido")
        .regex(/^[A-Z0-9-]+$/, "El SKU solo puede contener letras mayúsculas, números y guiones"),
    description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").max(500, "La descripción no puede exceder 500 caracteres"),
    price: z
        .number()
        .min(0, "El precio debe ser positivo")
        .refine((val) => val > 0, "El precio debe ser mayor a 0"),
    category: z.string().min(1, "La categoría es requerida"),
    stock: z.number().int("El stock debe ser un número entero").min(0, "El stock no puede ser negativo"),
    isActive: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
