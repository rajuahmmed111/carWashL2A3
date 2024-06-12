import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidation.createValidationSchema),
  //   UserControllers.createStudent,
);

export const UsersRoutes = router;
