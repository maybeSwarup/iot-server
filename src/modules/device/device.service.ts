import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IDeviceDoc, NewCreatedDevice, UpdateDeviceBody } from './device.interfaces';
import Device from './device.model';
import { ApiError } from '../errors';

/**
 * Create new Device
 * @param {NewCreatedDevice} deviceBody
 * @returns {Promise<IDeviceDoc>}
 */
export async function createDevice(deviceBody: NewCreatedDevice): Promise<IDeviceDoc> {
  return Device.create(deviceBody);
}

/**
 * Query for devices
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryDevices = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  if (filter['skills']) {
    const skills = filter['skills'].split(',');
    Object.assign(filter, { skills: { $in: skills } });
  }
  const devices = await Device.paginate(filter, options);
  return devices;
};

/**
 * Get Device by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IDeviceDoc | null>}
 */
export const getDeviceById = async (id: mongoose.Types.ObjectId): Promise<IDeviceDoc | null> => Device.findById(id);

/**
 * Update Device by id
 * @param {mongoose.Types.ObjectId} DeviceId
 * @param {UpdateDeviceBody} updateBody
 * @returns {Promise<IDeviceDoc | null>}
 */
export const updateDeviceById = async (
  DeviceId: mongoose.Types.ObjectId,
  updateBody: UpdateDeviceBody
): Promise<IDeviceDoc | null> => {
  const device = await getDeviceById(DeviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  Object.assign(device, updateBody);

  await device.save();
  return device;
};

/**
 * Delete Device by id
 * @param {mongoose.Types.ObjectId} DeviceId
 * @returns {Promise<IDeviceDoc | null>}
 */
export const deleteDeviceById = async (DeviceId: mongoose.Types.ObjectId): Promise<IDeviceDoc | null> => {
  const device = await getDeviceById(DeviceId);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }
  await device.remove();
  return device;
};
