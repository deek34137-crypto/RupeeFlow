require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,

  FOREX: {
    BASE_URL: process.env.FOREX_API || "https://api.exchangerate-api.com/v4/latest",
    API_KEY: process.env.FOREX_API_KEY || null
  }
};