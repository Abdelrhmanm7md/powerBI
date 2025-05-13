import express from "express";

const TokenRouter = express.Router();

import * as TokenController from "./token.controller.js";


TokenRouter.get("/", TokenController.getTokenFromBelal);


TokenRouter.put("/:id", TokenController.updateUser);
TokenRouter.post("/:id", TokenController.createToken);

TokenRouter.delete("/:id", TokenController.deleteUser);
export default TokenRouter;
