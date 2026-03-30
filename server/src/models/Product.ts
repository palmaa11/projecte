import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  code: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  catalogPrice: number;
  categoryId: mongoose.Types.ObjectId;
  createdAtProduct: Date;
  deletedAt?: Date | null;
}

const productSchema = new Schema<IProduct>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true
    },
    longDescription: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    catalogPrice: {
      type: Number,
      required: true,
      min: 0
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    createdAtProduct: {
      type: Date,
      required: true,
      default: Date.now
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);