const getIp = require("../utils/fetchIp");
const responseHandler = require("../utils/responseHandler");

let ConnectionResetTime = process.env.ConnectionResetTime || 1;
let numberOfAllowedHits = process.env.numberOfAllowedHits || 3;

const rateLimiter = async (req, res, next) => {
  let ttl;
  if (!req.$redisConnected) {
    throw new Error("Unable to connect to Redis, please try again");
  }
  const redisClient = req.$redisClientProxy;
  const ip = getIp(req);
  const numOfRequests = await redisClient.incr(ip);

  if (numOfRequests === 1) {
    redisClient.expire(ip, ConnectionResetTime);
    ttl = ConnectionResetTime;
  } else {
    ttl = await redisClient.ttl(ip);
  }

  let rateLimitRemaining = numberOfAllowedHits - numOfRequests;

  return numOfRequests > numberOfAllowedHits
    ? responseHandler(res, "Too many request...", 429, {
        ip,
        rtl: rateLimitRemaining,
        ttl,
      })
    : next();
};

module.exports = rateLimiter;
