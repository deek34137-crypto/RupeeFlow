const axios = require("axios");
const { FOREX } = require("../config");

async function getRate(from, to) {
  const res = await axios.get(`${FOREX.BASE_URL}/${from}`)
  return res.data.rates[to];
}

module.exports = { getRate };