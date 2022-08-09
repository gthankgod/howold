import responseHandler from "../utils/responseHandler.js";
import service from "../services/index.js";

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

export default calculateAge;
