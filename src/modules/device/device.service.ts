import httpStatus from 'http-status';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IDeviceDoc, IHumidity, NewCreatedDevice, UpdateDeviceBody } from './device.interfaces';
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
  const devices = await Device.paginate(filter, options);
  return devices;
};

/**
 * Get Device by id
 * @param {IDeviceDoc.uid} uid
 * @returns {Promise<IDeviceDoc | null>}
 */
export const getDeviceById = async (uid: string): Promise<any | null> => {
  const devices: any = await Device.find({ uid }).limit(1);
  return devices[0];
};

/**
 * Update Device by id
 * @param {string} deviceUid
 * @param {UpdateDeviceBody} updateBody
 * @returns {Promise<IDeviceDoc | null>}
 */
export const updateDeviceById = async (deviceUid: string, updateBody: UpdateDeviceBody): Promise<IDeviceDoc | null> => {
  const device = await getDeviceById(deviceUid);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  Object.assign(device, updateBody);

  await device.save();
  return device;
};

/**
 * Delete Device by id
 * @param {string} deviceUid
 * @returns {Promise<IDeviceDoc | null>}
 */
export const deleteDeviceById = async (deviceUid: string): Promise<IDeviceDoc | null> => {
  const device = await getDeviceById(deviceUid);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  await device.remove();
  return device;
};

/**
 * Query for readings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryReadings = async (
  deviceUid: string,
  parameter: string,
  filter: Record<string, any>,
  options: IOptions
): Promise<any> => {
  const device = await getDeviceById(deviceUid);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  const readings = await Device.find(
    {
      _id: device._id,
      [parameter]: { createdOn: { $gte: filter['start_on'], $lte: filter['end_on'] } },
    },
    parameter,
    options
  );
  // [parameter].paginate(
  //   { createdOn: { $gte: filter['start_on'], $lte: filter['end_on'] } },
  //   options
  // );

  return readings;
};

/**
 * Update Device by id
 * @param {string} deviceUid
 * @param {UpdateDeviceBody} updateBody
 * @returns {Promise<IDeviceDoc | null>}
 */
export const putReading = async (
  deviceUid: string,
  parameter: string,
  updateBody: IHumidity
): Promise<IDeviceDoc | null> => {
  const device = await getDeviceById(deviceUid);
  if (!device) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Device not found');
  }

  device[parameter].push({ reading: updateBody.reading });

  await device.save();
  return device;
};
