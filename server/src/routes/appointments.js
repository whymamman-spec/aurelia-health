import { Router } from "express";

import {
  createAppointment,
  getAppointmentByReference,
} from "../controllers/appointmentController.js";

import { getBookedSlots } from "../controllers/slotController.js";

const router = Router();

router.post("/", createAppointment);

// IMPORTANT: This must come before /:reference
router.get("/slots", getBookedSlots);

router.get("/:reference", getAppointmentByReference);

export default router;
