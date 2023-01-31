import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { deviceController, deviceValidation } from '../../modules/device';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageDevices'), validate(deviceValidation.createDevice), deviceController.createDevice)
  .get(auth('getDevices'), validate(deviceValidation.getDevices), deviceController.getDevices);

router
  .route('/:deviceUid')
  .get(auth('getDevices'), validate(deviceValidation.getDevice), deviceController.getDevice)
  .patch(auth('manageDevices'), validate(deviceValidation.updateDevice), deviceController.updateDevice)
  .delete(auth('manageDevices'), validate(deviceValidation.deleteDevice), deviceController.deleteDevice);

router
  .route('/:deviceUid/readings/:parameter')
  .get(auth('getDevices'), validate(deviceValidation.getReadings), deviceController.getReadings)
  .put(auth('manageDevices'), validate(deviceValidation.putReading), deviceController.putReading);

export default router;
