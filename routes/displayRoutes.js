const express = require("express");
const router = express.Router();
const DisplayService = require("../services/displayService");

router.get("/plateInfo", (req, res) => {
  try {
    DisplayService.showPlateInfo(req.query);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/clock", (req, res) => {
  try {
    DisplayService.showClock();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/thankyou", (req, res) => {
  try {
    DisplayService.showThankYou(req.query);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/welcome", (req, res) => {
  try {
    DisplayService.showWelcome(req.query);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
