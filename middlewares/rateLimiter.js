const getIp = require("../utils/fetchIp");
const responseHandler = require("../utils/responseHandler");

let ConnectionResetTime = process.env.ConnectionResetTime || 1;
let numberOfAllowedHits = process.env.numberOfAllowedHits || 3;

const rateLimiter = async (req, res, next) => {
  if (!req.$redisConnected) {
    throw new Error("Unable to connect to Redis, please try again");
  }

  const redisClient = req.$redisClientProxy;
  const ip = getIp(req);
  const numOfRequests = await redisClient.incr(ip);

  numOfRequests === 1
    ? redisClient.expire(ip, ConnectionResetTime)
    : redisClient.ttl(ip);

  return numOfRequests > numberOfAllowedHits
    ? responseHandler(res, "Too many request...", 429)
    : next();
};

module.exports = rateLimiter;
