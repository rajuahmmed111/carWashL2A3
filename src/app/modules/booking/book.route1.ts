import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './book.controller';
import { BookingValidation } from './book.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.createBooking,
);
router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBooking);

export const BookingRoutes = router;
