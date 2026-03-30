import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  productId: mongoose.Types.ObjectId;
  offerPrice: number;
  discountPercent: number;
  startDate: Date;
  endDate?: Date | null;
}

const offerSchema = new Schema<IOffer>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    offerPrice: {
      type: Number,
      required: true,
      min: 0
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const Offer = mongoose.model<IOffer>("Offer", offerSchema);