import { z } from 'zod';

const slotValidationSchema = z.object({
  body: z.object({
    service: z.string().refine((value) => /^[a-fA-F0-9]{24}$/.test(value), {
      message: 'Invalid ObjectId',
    }),
    date: z.string().refine(
      (value) => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        return datePattern.test(value);
      },
      {
        message: 'Invalid date format, should be YYYY-MM-DD',
      },
    ),
    startTime: z.string().refine(
      (value) => {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timePattern.test(value);
      },
      {
        message: 'Invalid time format, should be HH:mm',
      },
    ),
    endTime: z.string().refine(
      (value) => {
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        return timePattern.test(value);
      },
      {
        message: 'Invalid time format, should be HH:mm',
      },
    ),
    isBooked: z.boolean(),
  }),
});

export const SlotValidation = {
  slotValidationSchema,
};
