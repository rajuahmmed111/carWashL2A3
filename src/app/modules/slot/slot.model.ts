import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
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
    type: Boolean,
    required: true,
  },
});

export const Slot = model('Slot', bookingSchema);
