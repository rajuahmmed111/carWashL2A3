import { Router } from 'express';
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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
