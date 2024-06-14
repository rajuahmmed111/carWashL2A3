import { Router } from 'express';
import { BookingRoutes } from '../modules/booking/book.route1';
import { myBookingRoutes } from '../modules/booking/book.route2';
import { ServicesRoutes } from '../modules/serviceM/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { UsersRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoute = [
  {
    path: '/auth',
    route: UsersRoutes,
  },

  {
    path: '/services',
    route: ServicesRoutes,
  },

  {
    path: '/services',
    route: SlotRoutes,
  },

  {
    path: '/slots',
    route: SlotRoutes,
  },

  {
    path: '/bookings',
    route: BookingRoutes,
  },

  {
    path: '/my-bookings',
    route: myBookingRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
