function responseHandler(res, data = null, code) {
  return res.status(code).json({ age: data });
}

module.exports = responseHandler;
