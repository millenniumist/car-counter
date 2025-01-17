const os = require('os');

const getSerialPort = () => {
    switch (os.platform()) {
        case 'darwin': // macOS
            return '/dev/tty.usbserial-0001';
        case 'linux':
            return '/dev/ttyUSB0';
        default:
            return '/dev/ttyUSB0';
    }
};

module.exports = {
    // Server configuration
    port: process.env.NODE_PORT || 3030,
    BASE_URL: process.env.BASE_URL || "http://localhost:3030",
    
    // Environment settings
    isDevelopment: process.env.NODE_ENV !== 'production',
    logPath: 'log',
    
    // Display configuration
    enabledLEDMatrix: process.env.APP_ENABLED_LED_MATRIX || true,
    serialPortFile: process.env.APP_SERIAL_PORT_FILE || getSerialPort(),
    timezoneOffset: 7,
    
    // GPIO configuration
    GPIO_PINS: {
        ENTRANCE: 17,
        EXIT: 18
    },
    
    // Parking settings
    PARKING: {
        DEFAULT_CAPACITY: 100,
        MIN_CAPACITY: 1
    },
    
    // Display messages
    DISPLAY: {
        THANK_YOU_MESSAGE: "ขอบคุณค่ะ",
        WELCOME_MESSAGE: "ยินดีต้อนรับ",
        FORBIDDEN_MESSAGE: "ไม่อนุญาติ กรุณาติดต่อเจ้่าหน้าที่"
    }
};
