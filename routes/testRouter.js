import express from "express";
import { testingController } from "../controllers/testController.js";

//router object
const router = express.Router();

//Routes
router.get("/", testingController);

//export
export default router