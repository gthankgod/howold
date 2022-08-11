const responseHandler = require("../utils/responseHandler.js");
const service = require("../services/index.js");

function calculateAge(req, res) {
  try {
    if (req.query && !req.query.dob)
      throw new Error("No Date of birth Provided");
    let reqData = { dob: req.query.dob };
    let result = service.calculateAge(reqData);
    return responseHandler(res, result, 200);
  } catch (error) {
    return responseHandler(res, error.message, 409);
  }
}

module.exports = calculateAge;
