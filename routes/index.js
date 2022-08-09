const { Router } = require("express");
const calculateAge = require("../controllers/index.js");
const rateLimiter = require("../utils/rateLimiter.js")
const router = Router()

router.use(rateLimiter());

router.get("/", calculateAge);

module.exports = router;
