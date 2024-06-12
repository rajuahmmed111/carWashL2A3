import { z } from 'zod';

const createValidationSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' })
    .transform((email) => email.toLowerCase().trim()),
  password: z.string().nonempty({ message: 'Password is required' }),
  phone: z.string().nonempty({ message: 'Phone number is required' }),
  role: z.enum(['admin', 'user']).default('user'),
  address: z.string().nonempty({ message: 'Address is required' }),
});

export const userValidation = {
  createValidationSchema,
};
