const express = require("express");
const upload = require('../middlewares/uploader');

const router = express.Router();
const carController = require("../controller/carController");

// Cars API
router.post("/", upload.array('images'), carController.createCar);
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.delete("/:id", carController.deleteCarById);
router.patch("/:id", carController.updateCar);

module.exports = router;
