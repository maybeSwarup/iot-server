import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { catchAsync, pick } from '../utils';
import * as jobService from './job.service';
import { ApiError } from '../errors';
import { IOptions } from '../paginate/paginate';

export const createJob = catchAsync(async (req: Request | any, res: Response | any) => {
  const job = await jobService.createJob(req.body);
  res.status(httpStatus.CREATED).send(job);
});

export const getJobs = catchAsync(async (req: Request | any, res: Response | any) => {
  const filter = pick(req.query, ['skills', 'experience', 'postedById']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await jobService.queryJobs(filter, options);
  res.send(result);
});

export const getJob = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.JobId === 'string') {
    const job = await jobService.getJobById(new mongoose.Types.ObjectId(req.params.JobId));
    if (!job) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }
    res.send(job);
  }
});

export const updateJob = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.JobId === 'string') {
    const job = await jobService.updateJobById(new mongoose.Types.ObjectId(req.params.JobId), req.body);
    res.send(job);
  }
});

export const deleteJob = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.JobId === 'string') {
    await jobService.deleteJobById(new mongoose.Types.ObjectId(req.params.JobId));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
