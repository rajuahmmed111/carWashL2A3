import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const bookingSchema = new Schema<TSlot>(
  {
    service: {
      type: String,
      ref: 'Service',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Slot = model('Slot', bookingSchema);
