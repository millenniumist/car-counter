const express = require("express");
const router = express.Router();
const parkingRoutes = require("./parkingRoutes");
const displayRoutes = require("./displayRoutes");
const sseRoutes = require("./sseRoutes");
const SerialPortService = require("../services/serialPort");

router.use("/", parkingRoutes);
router.use("/", displayRoutes);
router.use("/", sseRoutes);
router.get('/reset-usb', (req, res) => {
    SerialPortService.resetUSB();
    res.json({ success: true, message: 'USB reset completed' });
});


module.exports = router;
