import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  trackName: string;
  selectedTier: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  github: string;
  linkedin?: string;
  university: string;
  degree: string;
  resume: {
    data: string;
    contentType: string;
    filename: string;
  };
  photo?: {
    data: string;
    contentType: string;
    filename: string;
  };
  experience: string;
  motivation: string;
  status: string;
  paymentStatus: string;
  acceptedAt?: Date;
  price: number;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    trackName: { type: String, required: true },
    selectedTier: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    github: { type: String, required: true },
    linkedin: { type: String, required: false },
    university: { type: String, required: true },
    degree: { type: String, required: true },
    resume: {
      data: { type: String, required: true },
      contentType: { type: String, required: true },
      filename: { type: String, required: true },
    },
    photo: {
      data: { type: String, required: false },
      contentType: { type: String, required: false },
      filename: { type: String, required: false },
    },
    experience: { type: String, required: true },
    motivation: { type: String, required: true },
    status: { type: String, default: "Pending" },
    paymentStatus: { type: String, default: "Unpaid" },
    acceptedAt: { type: Date },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);