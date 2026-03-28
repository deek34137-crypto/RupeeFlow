const apiKeys = require("../data/apiKeys");

function authMiddleware(req, res, next) {
  const apiKey = req.headers["x-rapidapi-key"];

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key missing"
    });
  }

  const user = apiKeys.find(k => k.key === apiKey);

  if (!user) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key"
    });
  }

  if (user.usage >= user.limit) {
    return res.status(429).json({
      success: false,
      message: "Rate limit exceeded"
    });
  }

  // increase usage
  user.usage++;

  // attach user to request
  req.user = user;

  next();
}

module.exports = authMiddleware;