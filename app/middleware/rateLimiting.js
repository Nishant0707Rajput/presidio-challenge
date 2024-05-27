const setRateLimit = require("express-rate-limit");
const constantCommon = require("../constant/common");
// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: constantCommon.API_PER_DAY,
    message: JSON.stringify({ "success": true,
    "status_code": 429,
    "message": `Hey, Sorry! You exceeded the limit of ${constantCommon.API_PER_DAY} requests per day`,
    "result": {} }),
    headers: true,
});

module.exports = rateLimitMiddleware;