function responseHandler(res, data = null, code, options) {
  let SuccessResponse = () => {
    return res.status(200).json({ age: data });
  };

  let RateLimitResponse = () => {
    res.setHeader("x-ratelimit-limit", 1);
    res.setHeader("x-ratelimit-remaining", options.ttl);
    return res.status(429).json({
      error: `${options.ip} has been rate limited. Please try again in ${options.ttl} seconds`,
    });
  };
  let BadResponse = () => {
    return res.status(400).json({ error: data });
  };
  let ServerResponse = () => {
    return res.status(500).json({ error: "Server Error. Please try again" });
  };

  let validCodes = {
    200: SuccessResponse,
    400: BadResponse,
    429: RateLimitResponse,
    500: ServerResponse,
  };

  if (!validCodes[code])
    return res.status(code).json({ error: "Unknown error" });
  return validCodes[code]();
}

module.exports = responseHandler;
