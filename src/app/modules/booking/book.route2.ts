import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { BookingControllers } from './book.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.user), BookingControllers.getMyBooking);

export const myBookingRoutes = router;
