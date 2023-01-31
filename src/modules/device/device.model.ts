import mongoose from 'mongoose';
import { IDeviceDoc, IDeviceModel } from './device.interfaces';
import { toJSON } from '../toJSON';
import { paginate } from '../paginate';

const tempratureSchema = new mongoose.Schema(
  {
    reading: Number,
  },
  {
    timestamps: true,
  }
);

const humiditySchema = new mongoose.Schema(
  {
    reading: Number,
  },
  {
    timestamps: true,
  }
);

const deviceSchema = new mongoose.Schema<IDeviceDoc, IDeviceModel>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    temprature: [tempratureSchema],
    humidity: [humiditySchema],
  },
  {
    timestamps: true,
  }
);

deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

const Device = mongoose.model<IDeviceDoc, IDeviceModel>('Device', deviceSchema);

export default Device;
