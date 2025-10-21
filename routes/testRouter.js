import express from "express";
const { testingController } = require("../controllers/testController");

//router object
const router = express.Router();

//Routes
router.get("/", testingController);

//export
module.exports = router;