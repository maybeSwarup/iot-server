import httpStatus from 'http-status';
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
  if (typeof req.params.deviceUid === 'string') {
    const device = await deviceService.getDeviceById(req.params.deviceUid);
    if (!device) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
    }
    res.send(device);
  }
});

export const updateDevice = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.deviceUid === 'string') {
    const device = await deviceService.updateDeviceById(req.params.deviceUid, req.body);
    res.send(device);
  }
});

export const deleteDevice = catchAsync(async (req: Request | any, res: Response | any) => {
  if (typeof req.params.deviceUid === 'string') {
    await deviceService.deleteDeviceById(req.params.deviceUid);
    res.status(httpStatus.NO_CONTENT).send();
  }
});
