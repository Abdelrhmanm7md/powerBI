import { buttonModel } from "../../../database/models/button.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const getCheckButtonStatus = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(buttonModel.find(), req.query);

  let results = await ApiFeat.mongooseQuery;
  results = results[0];
  res.json({
    message: "Done",
    results,
  });
});
const createButton = catchAsync(async (req, res, next) => {
    let newButton = new buttonModel(req.body);
    let addedButton = await newButton.save({ context: { query: req.query } });
    res.status(201).json({
      message: "Button has been created successfully!",
      addedButton,
    });
  });


const updateButton = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let err = "couldn't update! not found!";
  let message = "Button updated successfully!";

  let results = await buttonModel.findByIdAndUpdate(id, req.body, {
    new: true,
    context: { query: req.query },
  });
  if (!results || results.length === 0) {
    return res.status(404).json({ message: err });
  }
  results && res.json({ message: message, results });
});

const toggleIsBusy = catchAsync(async (req, res, next) => {
  const  id  = "6823af70e4a6250a04735bfc";

  const button = await buttonModel.findById(id);
  if (!button) {
    return res.status(404).json({ message: "Button not found!" });
  }

  button.isBusy = !button.isBusy;
  await button.save();

  res.json({ message: "isBusy toggled successfully!", result: button });
});

// const deleteButton = catchAsync(async (req, res, next) => {
//   let { id } = req.params;

//   let Button = await buttonModel.findByIdAndDelete(id);
//   let message_1 = "Couldn't delete! Not found!";
//   let message_2 = "Button deleted successfully!";
//   if (req.query.lang == "ar") {
//     message_1 = "لم يتم الحذف! غير موجود!";
//     message_2 = "تم حذف المستخدم بنجاح!";
//   }
//   if (!Button) {
//     return res.status(404).json({ message: message_1 });
//   }

//   res.status(200).json({ message: message_2 });
// });

export { createButton,getCheckButtonStatus, updateButton,toggleIsBusy };
