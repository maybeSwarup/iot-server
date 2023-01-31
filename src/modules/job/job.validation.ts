import Joi from 'joi';
import { NewCreatedJob } from './job.interfaces';
import { objectId } from '../validate';

const createJobBody: Record<keyof NewCreatedJob, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  email: Joi.string().email().required(),
  skills: Joi.array().items(Joi.string()).required(),
  experience: Joi.number().required(),
  postedById: Joi.custom(objectId).required(),
  applicantIds: Joi.array().items(Joi.custom(objectId)).optional(),
};

export const createJob = {
  body: Joi.object().keys(createJobBody),
};

export const getJobs = {
  query: Joi.object().keys({
    // filter
    title: Joi.string(),
    description: Joi.string(),
    email: Joi.string().email(),
    skills: Joi.string(),
    experience: Joi.number(),
    postedById: Joi.custom(objectId),
    applicantIds: Joi.array().items(Joi.custom(objectId)),
    applicantId: Joi.custom(objectId),

    // options
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getJob = {
  params: Joi.object().keys({
    JobId: Joi.string().custom(objectId),
  }),
};

export const updateJob = {
  params: Joi.object().keys({
    JobId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      email: Joi.string().email(),
      skills: Joi.array().items(Joi.string()),
      experience: Joi.number(),
      postedById: Joi.custom(objectId),
      applicantIds: Joi.array().items(Joi.custom(objectId)),
      applicantId: Joi.custom(objectId),
    })
    .min(1),
};

export const deleteJob = {
  params: Joi.object().keys({
    JobId: Joi.string().custom(objectId),
  }),
};
