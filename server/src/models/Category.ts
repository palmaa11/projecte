import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  parentId?: mongoose.Types.ObjectId | null;
  level: number;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2]
    }
  },
  {
    timestamps: true
  }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);