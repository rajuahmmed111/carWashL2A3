import { Router } from 'express';
import { UsersRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoute = [
  {
    path: '/users',
    route: UsersRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
