import Redis from 'ioredis';
import getIp from '../utils/fetchIp.js';
import responseHandler from './responseHandler.js';

let redis = process.env.NODE_ENV === "production" ? new Redis({
    host: process.env.REDIS_URL ,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
}) : new Redis();

export default function rateLimiter (remainingConnResetTime = 1, numberOfAllowedHits = 3) {
    return async function (req, res, next) {
        let ttl;
        const ip = getIp(req);
        const numOfRequests = await redis.incr(ip);

        if(numOfRequests === 1) {
            await redis.expire(ip, remainingConnResetTime);
            ttl = remainingConnResetTime;
        } else {
            ttl = await redis.ttl(ip)
        }

        if(numOfRequests > numberOfAllowedHits) { return responseHandler(res, null, 429, "error", "You've made too many request.")}
        next()
    }
}


