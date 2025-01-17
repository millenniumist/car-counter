const SerialPortService = require('./serialPort');
const config = require('../config/config');

class DisplayService {
  constructor() {
    this.currentMode = "CLOCK";
    this.clockInterval = null;
    this.currentTimeout = null;
  }

  clearTimers() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  showPlateInfo(data) {
    this.clearTimers();
    this.currentMode = "PLATE";
    const message = `${data.plateLetter}-${data.plateNumber}`;
    SerialPortService.displayMessage(message);
  }

  showClock() {
    this.clearTimers();
    this.currentMode = "CLOCK";
    this.clockInterval = this.handleClockDisplay();
  }

  showThankYou(data) {
    this.clearTimers();
    this.currentMode = "THANK_YOU";
    const licensePlate = this.formatLicensePlate(data);
    SerialPortService.displayDynamicMessage(`${licensePlate},${config.DISPLAY.THANK_YOU_MESSAGE}`);
  }

  showWelcome(data) {
    this.clearTimers();
    this.currentMode = "WELCOME";
    const licensePlate = this.formatLicensePlate(data);
    SerialPortService.displayDynamicBothLines(`${licensePlate},${config.DISPLAY.WELCOME_MESSAGE}`);
  }

  formatLicensePlate(data) {
    return data.plateLetter && data.plateNumber ? 
      `${data.plateLetter}${data.plateNumber}` : "";
  }

  handleClockDisplay() {
    const displayClock = () => {
      try {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
        const bangkokTime = new Date(utcTime + 3600000 * 7);
        
        const message = `${this.formatTime(bangkokTime)},${this.formatDate(bangkokTime)}`;
        SerialPortService.displayMessage(message, "white");
      } catch (error) {
        console.error('Clock display error:', error);
      }
    };

    displayClock();
    return setInterval(displayClock, 1000);
  }

  formatTime(date) {
    return [
      String(date.getHours()).padStart(2, "0"),
      String(date.getMinutes()).padStart(2, "0"),
      String(date.getSeconds()).padStart(2, "0")
    ].join(':');
  }

  formatDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[date.getDay()];
    const dateNum = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${dateNum}.${month}.${dayName.slice(0, 2).toUpperCase()}`;
  }
}

module.exports = new DisplayService();
