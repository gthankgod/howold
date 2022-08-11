function responseHandler(res, data = null, code) {
  let ValidResponseCode = {
    200: 1,
    400: 1,
    429: 1,
    500: 1,
  };

  if (ValidResponseCode[code]) {
    res.statusCode = code;
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = code;
    res.end();
  }
}

module.exports = responseHandler;
