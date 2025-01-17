const gpio = require('rpi-gpio');
const config = require('../config/config');
const fetch = require('node-fetch');

class GpioService {
  initialize() {
    gpio.setup(config.GPIO_PINS.ENTRANCE, gpio.DIR_IN, gpio.EDGE_BOTH);
    gpio.setup(config.GPIO_PINS.EXIT, gpio.DIR_IN, gpio.EDGE_BOTH);
    this.setupListeners();
  }

  setupListeners() {
    gpio.on('change', (channel, value) => {
      if (value === true) {
        if (channel === config.GPIO_PINS.ENTRANCE) {
          this.handleEntrance();
        } else if (channel === config.GPIO_PINS.EXIT) {
          this.handleExit();
        }
      }
    });
  }

  async handleEntrance() {
    try {
      await fetch(`${config.BASE_URL}/adjust-count?value=-1`);
    } catch (error) {
      console.error('Entrance sensor error:', error);
    }
  }

  async handleExit() {
    try {
      await fetch(`${config.BASE_URL}/adjust-count?value=1`);
    } catch (error) {
      console.error('Exit sensor error:', error);
    }
  }
}

module.exports = new GpioService();
