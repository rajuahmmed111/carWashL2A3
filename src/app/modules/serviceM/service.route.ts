import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ServicesController } from './service.controller';
import { servicesValidation } from './service.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(servicesValidation.serviceSchema),
  ServicesController.createService,
);

// router.get(
//   '/:id',
//   SemesterRegistrationController.getSingleSemesterRegistration,
// );

// router.get(
//   '/:id',
//   SemesterRegistrationController.getSingleSemesterRegistration,
// );

// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );

// router.delete(
//   '/:id',
//   SemesterRegistrationController.deleteSemesterRegistration,
// );

// router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const ServicesRoutes = router;
