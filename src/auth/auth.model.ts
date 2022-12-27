import * as mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    point: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);
export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export interface User {
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
}
