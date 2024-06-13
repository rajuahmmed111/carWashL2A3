import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.createUserValidationSchema),
  UserControllers.createSignIn,
);
router.post(
  '/login',
  validateRequest(userValidation.loginValidationSchema),
  UserControllers.loginUser,
);
router.post(
  '/refresh-token',
  validateRequest(userValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken,
);

export const UsersRoutes = router;
