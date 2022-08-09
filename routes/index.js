import { Router } from "express";
const router = Router();
import calculateAge from "../controllers/index.js";
import rateLimiter from "../utils/rateLimiter.js";

router.use(rateLimiter());

router.get("/", calculateAge);

export default router;
