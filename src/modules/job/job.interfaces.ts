import { Document, Model, ObjectId } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IJob {
  title: string;
  description: string;
  email: string;
  skills: Array<string>;
  experience: number;
  postedById: ObjectId;
  applicantIds: Array<ObjectId>;
}

export interface IJobDoc extends IJob, Document {}

export interface IJobModel extends Model<IJobDoc, Document> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export interface UpdateJobBody extends Partial<IJob> {
  applicantId: ObjectId;
}

export type NewCreatedJob = Partial<IJob>;
