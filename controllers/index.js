const responseHandler = require("../utils/responseHandler.js")
const service = require('../services/index.js')

function calculateAge(req, res) {
  try {
    let result = service.calculateAge({ ...req.query });
    return responseHandler(
      res,
      result,
      200,
      "success",
      "Data succesfully gotten"
    );
  } catch (error) {
    return responseHandler(res, null, 400, "error", error.message);
  }
}

module.exports = calculateAge;
