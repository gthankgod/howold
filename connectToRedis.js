module.exports = (app) => {
  const Redis = require("ioredis");
  let redisClient =
    process.env.NODE_ENV === "production"
      ? new Redis({
          host: process.env.REDIS_URL,
          port: process.env.REDIS_PORT,
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,
        })
      : new Redis();

  redisClient.on("connect", () => {
    // console.log("Redis connected");
  });

  redisClient.on("error", (error) => {
    console.log(error.message);
  });
  /*
          If ratelimiting is enabled and there's a valid redis connection
          add a redis object proxy to req so we can access it easily in middlewares.
          Avoid multiple reconnection to redis
          */
  app.use((req, res, next) => {
    if (redisClient.status === "ready") {
      //attach client and connected prop to req so it's accessible down other middleware chains
      req.$redisConnected = true;
      req.$redisClientProxy = redisClient;
    }
    next();
  });
};
