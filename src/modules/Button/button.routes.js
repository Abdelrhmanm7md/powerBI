import express from "express";

const buttonRouter = express.Router();

import * as buttonController from "./button.controller.js";


buttonRouter.get("/", buttonController.getCheckButtonStatus);
buttonRouter.post("/", buttonController.createButton);

buttonRouter.put("/toggle", buttonController.toggleIsBusy);
buttonRouter.put("/:id", buttonController.updateButton);

export default buttonRouter;
