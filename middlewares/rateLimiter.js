const getIp = require("../utils/fetchIp");
const responseHandler = require("../utils/responseHandler");

let ConnectionResetTime = process.env.ConnectionResetTime || 1;
let numberOfAllowedHits = process.env.numberOfAllowedHits || 3;

async function rateLimiter(req, res, next) {
  if (!req.$redisConnected) {
    console.log("NO REDIS CLIENT");
    next();
    return;
  }

  const redisClient = req.$redisClientProxy;
  const ip = getIp(req);
  const numOfRequests = await redisClient.incr(ip);

  numOfRequests === 1
    ? await redisClient.expire(ip, ConnectionResetTime)
    : await redisClient.ttl(ip);

  return numOfRequests > numberOfAllowedHits
    ? responseHandler(res, "Too many request...", 429)
    : next();
}

module.exports = rateLimiter;
