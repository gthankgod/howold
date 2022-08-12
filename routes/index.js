const { Router } = require("express");
const calculateAge = require("../controllers/index.js");
const rateLimiter = require("../middlewares/rateLimiter.js");
const router = Router();

router.get("/", rateLimiter, calculateAge);

module.exports = router;
