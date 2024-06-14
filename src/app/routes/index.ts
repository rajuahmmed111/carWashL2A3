import { Router } from 'express';
import { BookingRoutes } from '../modules/booking/book.route';
import { ServicesRoutes } from '../modules/serviceM/service.route';
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
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
