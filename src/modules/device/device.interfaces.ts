import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IDevice {
  uid: string;
  name: string;
  temprature: number;
  humidity: number;
}

export interface IDeviceDoc extends IDevice, Document {}

export interface IDeviceModel extends Model<IDeviceDoc, Document> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export interface UpdateDeviceBody extends Partial<IDevice> {}

export type NewCreatedDevice = Partial<IDevice>;
