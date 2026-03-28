require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  BASE_URL: process.env.FOREX_API || "https://api.exchangerate-api.com/v4/latest"
};