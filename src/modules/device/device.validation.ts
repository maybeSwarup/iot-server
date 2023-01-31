import Joi from 'joi';
import { NewCreatedDevice } from './device.interfaces';
import { objectId } from '../validate';

const createDeviceBody: Record<keyof NewCreatedDevice, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  email: Joi.string().email().required(),
  skills: Joi.array().items(Joi.string()).required(),
  experience: Joi.number().required(),
  postedById: Joi.custom(objectId).required(),
  applicantIds: Joi.array().items(Joi.custom(objectId)).optional(),
};

export const createDevice = {
  body: Joi.object().keys(createDeviceBody),
};

export const getDevices = {
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

export const getDevice = {
  params: Joi.object().keys({
    DeviceId: Joi.string().custom(objectId),
  }),
};

export const updateDevice = {
  params: Joi.object().keys({
    DeviceId: Joi.required().custom(objectId),
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

export const deleteDevice = {
  params: Joi.object().keys({
    DeviceId: Joi.string().custom(objectId),
  }),
};
