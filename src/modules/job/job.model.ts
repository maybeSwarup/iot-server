import mongoose from 'mongoose';
import validator from 'validator';
import { IJobDoc, IJobModel } from './job.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const jobSchema = new mongoose.Schema<IJobDoc, IJobModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    skills: [String],
    experience: Number,
    postedById: mongoose.Schema.Types.ObjectId,
    applicantIds: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

jobSchema.plugin(toJSON);
jobSchema.plugin(paginate);

const Job = mongoose.model<IJobDoc, IJobModel>('Job', jobSchema);

export default Job;
