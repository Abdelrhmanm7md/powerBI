import mongoose from "mongoose";

const buttonSchema = mongoose.Schema(
  {
    isBusy: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);



export const buttonModel = mongoose.model("button", buttonSchema);
