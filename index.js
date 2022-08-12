const express = require("express");
const throng = require("throng");
const connectToRedis = require("./connectToRedis.js");
const routes = require("./routes/index.js");
const responseHandler = require("./utils/responseHandler.js");

process.env.ENABLE_CLUSTERS ? throng(startApp) : startApp();

function startApp() {
  const app = express();

  const PORT = process.env.PORT || "3000";
  app.set("port", PORT);

  connectToRedis(app);

  //   Routes
  app.use("/howold", routes);
  app.use("/", (req, res) => responseHandler(res, "Welcome", 200));

  /**
   * Listen on provided port, on all network interfaces.
   */

  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server listening on PORT ${PORT}`)
  );
}
