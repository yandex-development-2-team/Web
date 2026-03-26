import z from 'zod';

export const textareaSchema = z.object({
  content: z
    .string()
    .min(1, 'Поле обязательно')
    .max(500, 'Максимум 500 символов'),
});

export type TextareaSchemaType = z.infer<typeof textareaSchema>;

export const doubleInputSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  url: z.url('Введите корректный URL'),
});

export type DoubleInputSchemaType = z.infer<typeof doubleInputSchema>;
