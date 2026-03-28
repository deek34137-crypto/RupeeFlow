const { getRate } = require("../services/forex.service");
const { calculateFees } = require("../services/fee.service");
const { getBestMethod } = require("../utils/recommendation.util");

exports.realCost = async (req, res) => {
  try {
    const { from, to, amount, payment_method } = req.body;

    // 🔒 PLAN CHECK (FIRST)
    if (req.user.plan === "free") {
      return res.status(403).json({
        success: false,
        message: "Upgrade plan to access this endpoint"
      });
    }

    // 🧾 VALIDATION
    if (!from || !to || !amount || !payment_method) {
      return res.status(400).json({
        success: false,
        message: "Missing fields"
      });
    }

    // 💱 GET RATE
    const rate = await getRate(from, to);
    const converted = amount * rate;

    // 💰 CALCULATE FEES
    const fees = calculateFees(converted, payment_method);

    // 🧠 BEST METHOD
    const best = getBestMethod(converted);

    // ✅ RESPONSE
    res.json({
      success: true,
      from,
      to,
      amount,
      rate,
      converted_amount: converted,

      fees: {
        processing_fee: fees.processing,
        forex_loss: fees.forexLoss,
        gst: fees.gst
      },

      total_fees_inr: fees.total,
      final_received_inr: fees.final,
      best_method: best,

      usage: {
        current: req.user.usage,
        limit: req.user.limit
      },

      timestamp: new Date().toISOString()
    });

  } catch (err) {
    // ❗ PROPER ERROR HANDLING
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};