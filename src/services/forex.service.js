const axios = require("axios");
const { BASE_URL } = require("../config");

async function getRate(from, to) {
  const res = await axios.get(`${BASE_URL}/${from}`);
  return res.data.rates[to];
}

module.exports = { getRate };