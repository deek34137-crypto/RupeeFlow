const { getRate } = require("../services/forex.service");

exports.convert = async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({ success: false, message: "Missing params" });
    }

    

    const rate = await getRate(from, to);
    const result = amount * rate;

    res.json({
      success: true,
      from,
      to,
      amount: Number(amount),
      rate,
      converted_amount: result,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};