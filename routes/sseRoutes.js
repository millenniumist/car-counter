const express = require("express");
const router = express.Router();
const ParkingService = require("../services/parkingService");

router.get("/events", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const sendUpdate = () => {
      try {
        res.write(`data: ${JSON.stringify(ParkingService.getParkingData())}\n\n`);
      } catch (error) {
        console.error('SSE update error:', error);
      }
    };

    sendUpdate();
    const intervalId = setInterval(sendUpdate, 1000);

    req.on("close", () => {
      clearInterval(intervalId);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
