import { Router } from "express";
import { getBookedSlots } from "../controllers/slotController.js";

const router = Router();

router.get("/", getBookedSlots);

export default router;
