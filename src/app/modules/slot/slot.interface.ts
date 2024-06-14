export type TSlot = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: 'available' | 'booked' | 'canceled';
};

export interface TSlotQueryParams {
  date?: string;
  serviceId?: string;
}
