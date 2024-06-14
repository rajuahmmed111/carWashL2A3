import { Types } from 'mongoose';

export type Booking = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
