/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './book.service';

const createBooking = catchAsync(async (req, res) => {
  // console.log(req.user);
  const result = await BookingServices.createBooking(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful!',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBooking();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const getMyBooking = catchAsync(async (req, res) => {
  const { emailId } = req.user;

  const bookings = await BookingServices.getMyBooking(emailId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully',
    data: bookings,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getMyBooking,
};
