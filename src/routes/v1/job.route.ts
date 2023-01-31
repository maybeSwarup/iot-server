import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { jobController, jobValidation } from '../../modules/job';

const router: Router = express.Router();

router
  .route('/')
  .post(auth('manageJobs'), validate(jobValidation.createJob), jobController.createJob)
  .get(auth('getJobs'), validate(jobValidation.getJobs), jobController.getJobs);

router
  .route('/:JobId')
  .get(auth('getJobs'), validate(jobValidation.getJob), jobController.getJob)
  .patch(auth('manageJobs'), validate(jobValidation.updateJob), jobController.updateJob)
  .delete(auth('manageJobs'), validate(jobValidation.deleteJob), jobController.deleteJob);

export default router;
