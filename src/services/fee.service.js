const feeModels = {
  stripe: { percent: 0.032, forex: 0.015 },
  paypal: { percent: 0.044, forex: 0.035 },
  wise: { percent: 0.01, forex: 0.005 }
};

function calculateFees(amountInr, method) {
  const fee = feeModels[method];

  if (!fee) throw new Error("Invalid payment method");

  const processing = amountInr * fee.percent;
  const forexLoss = amountInr * fee.forex;
  const gst = (processing + forexLoss) * 0.18;

  const total = processing + forexLoss + gst;
  const final = amountInr - total;

  return { processing, forexLoss, gst, total, final };
}

module.exports = { feeModels, calculateFees };