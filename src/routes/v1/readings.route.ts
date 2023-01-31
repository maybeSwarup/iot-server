import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { deviceController, deviceValidation } from '../../modules/device';

const router: Router = express.Router();

router
  .route('/:parameter')
  .get(auth('getDevices'), validate(deviceValidation.getReadings), deviceController.getReadings)
  .put(auth('manageDevices'), validate(deviceValidation.putReading), deviceController.putReading);

export default router;
