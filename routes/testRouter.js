import express from "express";
const { testingController } = require("../controllers/testController");

//router object
const router = express.Router();

//Routes
router.get("/", testingController);

//export
export default router