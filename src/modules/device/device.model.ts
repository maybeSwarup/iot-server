import mongoose from 'mongoose';
import { IDeviceDoc, IDeviceModel } from './device.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const deviceSchema = new mongoose.Schema<IDeviceDoc, IDeviceModel>(
  {
    uid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    temprature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

const Device = mongoose.model<IDeviceDoc, IDeviceModel>('Device', deviceSchema);

export default Device;
