import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { SlotControllers } from './slot.controller';
import { slotValidation } from './slot.validation';
// import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  '/slots',
  auth(USER_ROLE.admin),
  validateRequest(slotValidation.slotValidationSchema),
  SlotControllers.createSlot,
);

router.get('/availability', SlotControllers.availableSlot);

export const SlotRoutes = router;
