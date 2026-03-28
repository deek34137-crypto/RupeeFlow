const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const convertRoute = require("./routes/convert.route");
const realCostRoute = require("./routes/realcost.route");
const authMiddleware = require("./middleware/auth.middleware");


const app = express();
// apply to all routes except root
app.use("/convert", authMiddleware, convertRoute);
app.use("/real-cost", authMiddleware, realCostRoute);

app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.get("/", (req, res) => {
  res.json({ message: "RupeeFlow API 🚀" });
});

app.use("/convert", convertRoute);
app.use("/real-cost", realCostRoute);

module.exports = app;