const express = require("express");

const routes = require("./routes/index.js");
const responseHandler = require("./utils/responseHandler.js");

startApp();

function startApp() {
  const app = express();

  const PORT = process.env.PORT || "3000";
  app.set("port", PORT);

  if (process.env.enable_rate_limit) {
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
      console.log("Redis connected");
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
  }

  //   Routes
  app.use("/howold", routes);
  app.use("/", (req, res) => responseHandler(res, "Welcome", 200));

  /**
   * Listen on provided port, on all network interfaces.
   */

  app.listen(PORT, "0.0.0.0", () =>
    console.log("Express server listening on port " + PORT)
  );
}
