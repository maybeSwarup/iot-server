import Joi from 'joi';
import { NewCreatedDevice } from './device.interfaces';
import { objectId } from '../validate';

const createDeviceBody: Record<keyof NewCreatedDevice, any> = {
  uid: Joi.string().required(),
  name: Joi.string().required(),
  temprature: Joi.number(),
  humidity: Joi.number(),
};

export const createDevice = {
  body: Joi.object().keys(createDeviceBody),
};

export const getDevices = {
  query: Joi.object().keys({
    // filter
    uid: Joi.string(),
    name: Joi.string(),
    temprature: Joi.number(),
    humidity: Joi.number(),

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
      uid: Joi.string(),
      name: Joi.string(),
      temprature: Joi.number(),
      humidity: Joi.number(),
    })
    .min(1),
};

export const deleteDevice = {
  params: Joi.object().keys({
    DeviceId: Joi.string().custom(objectId),
  }),
};
