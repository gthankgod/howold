const Redis = require("ioredis");
const getIp = require("../utils/fetchIp");
const responseHandler = require("./responseHandler");

let redis =
  process.env.NODE_ENV === "production"
    ? new Redis({
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      })
    : new Redis();

function rateLimiter(remainingConnResetTime = 1, numberOfAllowedHits = 3) {
  return async function (req, res, next) {
    const ip = getIp(req);
    const numOfRequests = await redis.incr(ip);

    if (numOfRequests === 1) {
      await redis.expire(ip, remainingConnResetTime);
    } else {
      await redis.ttl(ip);
    }

    if (numOfRequests > numberOfAllowedHits) {
      return responseHandler(res, null, 429);
    }
    next();
  };
}

module.exports = rateLimiter;
