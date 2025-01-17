const express = require("express");
const router = express.Router();
const ParkingService = require("../services/parkingService");
const SerialPortService = require("../services/serialPort");

router.get("/", (req, res) => {
  const parkingData = ParkingService.getParkingData();
  res.render("index", parkingData);
});

router.get("/adjust-count", (req, res) => {
  try {
    const value = parseInt(req.query.value);
    ParkingService.adjustCount(value);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/set-available", (req, res) => {
  try {
    const value = parseInt(req.query.value);
    ParkingService.setAvailable(value);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/set-capacity", (req, res) => {
  try {
    const value = parseInt(req.query.value);
    ParkingService.setCapacity(value);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
