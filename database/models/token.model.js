import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    fromDate: {
      type: String,
      required: true,
    },
    toDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const tokenModel = mongoose.model("token", tokenSchema);
