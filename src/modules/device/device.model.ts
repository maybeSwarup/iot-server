import mongoose from 'mongoose';
import validator from 'validator';
import { IDeviceDoc, IDeviceModel } from './device.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const deviceSchema = new mongoose.Schema<IDeviceDoc, IDeviceModel>(
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

deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

const Device = mongoose.model<IDeviceDoc, IDeviceModel>('Device', deviceSchema);

export default Device;
