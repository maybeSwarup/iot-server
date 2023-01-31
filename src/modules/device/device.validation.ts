import Joi from 'joi';
import { NewCreatedDevice } from './device.interfaces';

const createDeviceBody: Record<keyof NewCreatedDevice, any> = {
  uid: Joi.string().required(),
  name: Joi.string().required(),
  temprature: Joi.array().items(Joi.number()).optional(),
  humidity: Joi.array().items(Joi.number()).optional(),
};

export const createDevice = {
  body: Joi.object().keys(createDeviceBody),
};

export const getDevices = {
  query: Joi.object().keys({
    // filter
    uid: Joi.string(),
    name: Joi.string(),
    temprature: Joi.array().items(Joi.number()),
    humidity: Joi.array().items(Joi.number()),

    // options
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getDevice = {
  params: Joi.object().keys({
    deviceUid: Joi.string(),
  }),
};

export const updateDevice = {
  params: Joi.object().keys({
    deviceUid: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      uid: Joi.string(),
      name: Joi.string(),
      temprature: Joi.number(),
      humidity: Joi.number(),
    })
    .min(1),
};

export const deleteDevice = {
  params: Joi.object().keys({
    deviceUid: Joi.string(),
  }),
};

export const getReadings = {
  params: Joi.object().keys({
    deviceUid: Joi.string(),
    parameter: Joi.string().required(),
  }),
};

export const putReading = {
  params: Joi.object().keys({
    deviceUid: Joi.string(),
    parameter: Joi.string().required(),
  }),
  body: Joi.object().keys({
    reading: Joi.number().required(),
  }),
};
