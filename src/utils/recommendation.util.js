const { feeModels } = require("../services/fee.service");

function getBestMethod(amountInr) {
  let best = { name: null, cost: Infinity };

  for (const [name, fee] of Object.entries(feeModels)) {
    const cost = amountInr * (fee.percent + fee.forex);
    if (cost < best.cost) best = { name, cost };
  }

  return best.name;
}

module.exports = { getBestMethod };