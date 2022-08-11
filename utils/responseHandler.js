function responseHandler(res, data = null, code) {
  return res.status(code).json({ data });
}

module.exports = responseHandler;
