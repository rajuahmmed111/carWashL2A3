import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  description: z.string().trim().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  duration: z.number().min(0, 'Duration must be a positive number'),
  isDeleted: z.boolean().default(false),
});

export const servicesValidation = {
  serviceSchema,
};
