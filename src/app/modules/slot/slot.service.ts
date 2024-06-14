import httpStatus from 'http-status';
import AppError from '../../Error/Apperror';
import { Services } from '../serviceM/service.service';
import { TSlot, TSlotQueryParams } from './slot.interface';
import { Slot } from './slot.model';

const createSlot = async (payload: TSlot) => {
  const { startTime, endTime, service, date } = payload || {};

  const timeStringToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTimeString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0');
    const mins = (minutes % 60).toString().padStart(2, '0');
    return `${hours}:${mins}`;
  };

  const startTimeIntoMin = timeStringToMinutes(startTime);
  const endTimeIntoMin = timeStringToMinutes(endTime);

  if (startTimeIntoMin > endTimeIntoMin) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `endTime: ${endTime} is earlier than startTime: ${startTime}`,
    );
  }

  const timeBetweenStartAndEnd = endTimeIntoMin - startTimeIntoMin;

  const existingSlots = await Slot.find({
    service,
    date,
    startTime: { $gte: startTime, $lt: endTime },
  });

  if (existingSlots.length > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Slots already exist for service: ${service}, date: ${date}, startTime: ${startTime}, endTime: ${endTime}`,
    );
  }

  const getServiceData = await Services.getSingleServiceById(service);

  if (!getServiceData || !getServiceData.duration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Service with ID: ${service} not found or has no duration specified.`,
    );
  }

  const getDuration = getServiceData.duration;

  const totalSlotsCount = timeBetweenStartAndEnd / getDuration;

  const slots = [];
  for (let i = 0; i < totalSlotsCount; i++) {
    const slotStartTime = minutesToTimeString(
      startTimeIntoMin + i * getDuration,
    );
    const slotEndTime = minutesToTimeString(
      startTimeIntoMin + (i + 1) * getDuration,
    );

    const slot = {
      service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: 'available',
    };

    slots.push(slot);
  }

  const newSlots = await Slot.create(slots);
  return newSlots;
};

const availableSlot = async (payload: TSlotQueryParams) => {
  const query: { date?: string; service?: string } = {};
  if (payload?.date) {
    query.date = payload.date;
  }
  if (payload?.serviceId) {
    query.service = payload.serviceId;
  }

  const availableSlots = await Slot.find(query).populate('service');

  //   console.log('Payload From Service', payload);
  return availableSlots;
};

export const SlotServices = {
  createSlot,
  availableSlot,
};
