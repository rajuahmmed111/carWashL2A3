import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Error/Apperror';
import { Service } from '../serviceM/service.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import { TBooking } from './book.interface';
import { Booking } from './book.model';

const createBooking = async (userData: JwtPayload, payload: TBooking) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = payload;

  const isCustomer = await User.findOne(userData.email).select([
    '_id',
    'name',
    'email',
    'phone',
    'address',
  ]);
  const customerId = isCustomer?._id;

  if (!customerId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found !');
  }

  const isServiceExits = await Service.findById(serviceId);
  if (!isServiceExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Services not found !');
  }
  console.log(isServiceExits);

  const isSlotExits = await Slot.findById(slotId);
  if (!isSlotExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found !');
  }

  const bookingData = {
    customer: customerId,
    service: isServiceExits,
    slot: isSlotExits,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };

  //
  const result = (await Booking.create(bookingData)).populate(['customer']);
  return result;
};

const getAllBooking = async () => {
  const books = await Booking.find().populate('customer').populate('service');
  if (!books) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bookings is not found !');
  }

  return books;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMyBooking = async (emailId: any) => {
  const user = await User.findOne({ email: emailId });

  const userId = user?._id.toString();

  const myBookings = await Booking.find({ customer: userId }).populate([
    'service',
  ]);

  const filterBookings = myBookings.map((booking) => {
    const bookingObject = booking.toObject();
    delete bookingObject?.customer;
    return bookingObject;
  });

  if (!filterBookings) {
    throw new AppError(httpStatus.NOT_FOUND, 'My Bookings is not found !');
  }
  return filterBookings;
};

export const BookingServices = {
  createBooking,
  getAllBooking,
  getMyBooking,
};
