import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { ServicesController } from './service.controller';
import { servicesValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(servicesValidation.serviceSchema),
  ServicesController.createService,
);

router.get('/:id', ServicesController.getSingleServiceById);

router.get('/', ServicesController.getAllService);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(servicesValidation.updateServiceSchema),
  ServicesController.updateService,
);

router.delete('/:id', auth(USER_ROLE.admin), ServicesController.deletedService);

// router.get(
//   '/:id',
//   SemesterRegistrationController.getSingleSemesterRegistration,
// );

export const ServicesRoutes = router;
