import os from "node:os";
import http from "node:http";
import express from "express";
import throng from "throng";
import routes from "./routes/index.js";
import responseHandler from "./utils/responseHandler.js";

const WORKERS = process.env.WEB_CONCURRENCY || os.cpus().length;
process.env.ENABLE_CLUSTERS
  ? throng({ workers: WORKERS, lifetime: Infinity }, startApp)
  : startApp();

function startApp() {
  const app = express();

  const PORT = process.env.PORT || "3000";
  app.set("port", PORT);
  app.use("/howold", routes);
  app.use("/", (req, res) =>
    responseHandler(res, null, 200, "success", "Welcome")
  );

  var server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(PORT, "0.0.0.0", () =>
    console.log("Express server listening on port " + server.address().port)
  );
}
