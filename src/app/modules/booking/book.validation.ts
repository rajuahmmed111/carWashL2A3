import { z } from 'zod';
import { vehicleTypes } from './book.constant';

const bookingValidationSchema = z.object({
  body: z.object({
    serviceId: z.string().refine((value) => /^[a-fA-F0-9]{24}$/.test(value), {
      message: 'Invalid ObjectId for service',
    }),
    // slotId: z
    //   .string()
    //   .refine((value) => /^[a-fA-F0-9]{24}$/.test(value), {
    //     message: 'Invalid ObjectId for slot',
    //   }),
    vehicleType: z.enum(vehicleTypes),
    vehicleBrand: z.string().min(1, { message: 'Vehicle brand is required' }),
    vehicleModel: z.string().min(1, { message: 'Vehicle model is required' }),
    manufacturingYear: z
      .number()
      .int({ message: 'Manufacturing year must be an integer' })
      .min(1886, { message: 'Manufacturing year must be 1886 or later' })
      .max(new Date().getFullYear(), {
        message: 'Manufacturing year cannot be in the future',
      }),
    registrationPlate: z
      .string()
      .min(1, { message: 'Registration plate is required' }),
  }),
});

export const BookingValidation = {
  bookingValidationSchema,
};
