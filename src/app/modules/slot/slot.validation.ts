import { z } from 'zod';

const slotValidationSchema = z.object({
  body: z.object({
    service: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date must be in YYYY-MM-DD format',
    }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'Start time must be in HH:MM format',
    }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: 'End time must be in HH:MM format',
    }),
    isBooked: z
      .enum(['available', 'booked', 'canceled'], {
        message: "isBooked must be one of 'available', 'booked', or 'canceled'",
      })
      .default('available'),
  }),
});

export const slotValidation = {
  slotValidationSchema,
};
