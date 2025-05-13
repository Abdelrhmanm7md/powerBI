import { tokenModel } from "../../../database/models/token.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";


const getAllUsersByAdmin = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(tokenModel.find(), req.query);

  let results = await ApiFeat.mongooseQuery;
  results = results[0];
  res.json({
    message: "Done",
    results,
  });
});

const createToken = catchAsync(async (req, res, next) => {
    let newToken = new tokenModel(req.body);
    let addedToken = await newToken.save({ context: { query: req.query } });
    res.status(201).json({
      message: "Token has been created successfully!",
      addedToken,
    });
  });

const getTokenFromBelal = catchAsync(async (req, res, next) => {
let token = "9E0F998D-032A-4E94-9977-33F4E5776D53"
let fromDate = "2024-03-20"
let toDate = "2025-04-25"
res.json({message: "Done", token, fromDate, toDate });
});

const updateUser = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let err = "couldn't update! not found!";
  let message = "User updated successfully!";
  if (req.query.lang == "ar") {
    err = "لا يمكن التحديث! المستخدم غير موجود";
    message = "تم تحديث المستخدم بنجاح!";
  }
  if (req.body.userType == "admin") {
    req.body.isApproved = true;
  }
  let results = await tokenModel.findByIdAndUpdate(id, req.body, {
    new: true,
    userId: req.userId,
    context: { query: req.query },
  });
  if (!results || results.length === 0) {
    return res.status(404).json({ message: err });
  }
  results && res.json({ message: message, results });
});

const deleteUser = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let user = await tokenModel.findByIdAndDelete(id);
  let message_1 = "Couldn't delete! Not found!";
  let message_2 = "User deleted successfully!";
  if (req.query.lang == "ar") {
    message_1 = "لم يتم الحذف! غير موجود!";
    message_2 = "تم حذف المستخدم بنجاح!";
  }
  if (!user) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2 });
});

export { getAllUsersByAdmin,createToken, updateUser,getTokenFromBelal, deleteUser };


