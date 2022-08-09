function responseHandler(res, data = null, code = 400) {
  return res.status(code).json(data);
}

module.exports = responseHandler;
