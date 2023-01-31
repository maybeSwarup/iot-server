import { Document, Model, ObjectId } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IDevice {
  title: string;
  description: string;
  email: string;
  skills: Array<string>;
  experience: number;
  postedById: ObjectId;
  applicantIds: Array<ObjectId>;
}

export interface IDeviceDoc extends IDevice, Document {}

export interface IDeviceModel extends Model<IDeviceDoc, Document> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export interface UpdateDeviceBody extends Partial<IDevice> {
  applicantId: ObjectId;
}

export type NewCreatedDevice = Partial<IDevice>;
