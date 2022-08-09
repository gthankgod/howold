const http = require("node:http");
const express = require("express");
const throng = require("throng");
const routes = require("./routes/index.js");
const responseHandler = require("./utils/responseHandler.js");

process.env.ENABLE_CLUSTERS ? throng(startApp) : startApp();

function startApp() {
  const app = express();

  const PORT = process.env.PORT || "3000";
  app.set("port", PORT);
  app.use("/howold", routes);
  app.use("/", (req, res) => responseHandler(res, "Welcome", 200));

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(PORT, "0.0.0.0", () =>
    console.log("Express server listening on port " + server.address().port)
  );
}
