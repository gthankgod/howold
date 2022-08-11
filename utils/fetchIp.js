function getIp(req) {
  console.time("getIp");
  let ip = null;
  if (req.headers["x-client-ip"]) {
    ip = req.headers["x-client-ip"];
  } else if (req.headers["x-original-forwarded-for"]) {
    ip = req.headers["x-original-forwarded-for"].split(",")[0];
  } else if (req.headers["x-forwarded-for"]) {
    ip = req.headers["x-forwarded-for"].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }
  console.timeEnd("getIp");
  return ip;
}

module.exports = getIp;
