const config = require('../config/config');
const SerialPortService = require('./serialPort');
const DisplayService = require('./displayService');

class ParkingService {
  constructor() {
    this.parkingData = {
      availableSpaces: 0,
      carsParked: 0,
      totalCapacity: config.PARKING.DEFAULT_CAPACITY
    };
  }

  getParkingData() {
    return this.parkingData;
  }

  adjustCount(value) {
    DisplayService.clearTimers();
    this.parkingData.availableSpaces = Math.max(0, 
      Math.min(this.parkingData.totalCapacity, 
      this.parkingData.availableSpaces + value)
    );
    this.updateCarsParked();
    this.updateDisplay();
  }

  setAvailable(value) {
    DisplayService.clearTimers();
    this.parkingData.availableSpaces = Math.max(0, 
      Math.min(this.parkingData.totalCapacity, value)
    );
    this.updateCarsParked();
    this.updateDisplay();
  }

  setCapacity(value) {
    DisplayService.clearTimers();
    this.parkingData.totalCapacity = Math.max(config.PARKING.MIN_CAPACITY, value);
    this.parkingData.availableSpaces = Math.min(
      this.parkingData.availableSpaces, 
      this.parkingData.totalCapacity
    );
    this.updateCarsParked();
    this.updateDisplay();
  }

  updateCarsParked() {
    this.parkingData.carsParked = this.parkingData.totalCapacity - this.parkingData.availableSpaces;
  }

  updateDisplay() {
    SerialPortService.displayMessage(
      `${this.parkingData.availableSpaces}`
    );
  }
}

module.exports = new ParkingService();
