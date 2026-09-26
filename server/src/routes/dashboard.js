import { Router } from "express";
import { getTodayAppointments } from "../controllers/dashboardController.js";

const router = Router();

router.get("/today", getTodayAppointments);

export default router;
