const express = require("express");
const upload = require('../middlewares/uploader');

const router = express.Router();
const dashboardController = require("../controller/dashboardController");

// dashboard API
router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post("/users/create", upload.single("photo"), dashboardController.createUser);

module.exports = router;
