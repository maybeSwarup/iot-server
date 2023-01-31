import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { catchAsync, pick } from '../utils';
import * as deviceService from './device.service';
import { ApiError } from '../errors';
import { IOptions } from '../paginate/paginate';

export const createDevice = catchAsync(async (req: Request | any, res: Response | any) => {
  const device = await deviceService.createDevice(req.body);
  res.status(httpStatus.CREATED).send(device);
});

export const getDevices = catchAsync(async (req: Request | any, res: Response | any) => {
  const filter = pick(req.query, ['skills', 'experience', 'postedById']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await deviceService.queryDevices(filter, options);
  res.send(result);
});

export const getDevice = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.DeviceId === 'string') {
    const device = await deviceService.getDeviceById(new mongoose.Types.ObjectId(req.params.DeviceId));
    if (!device) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
    }
    res.send(device);
  }
});

export const updateDevice = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.DeviceId === 'string') {
    const device = await deviceService.updateDeviceById(new mongoose.Types.ObjectId(req.params.DeviceId), req.body);
    res.send(device);
  }
});

export const deleteDevice = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.DeviceId === 'string') {
    await deviceService.deleteDeviceById(new mongoose.Types.ObjectId(req.params.DeviceId));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
