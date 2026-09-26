import { Router } from "express";

import {
  createAppointment,
  getAppointmentByReference,
  cancelAppointment,
  rescheduleAppointment,
} from "../controllers/appointmentController.js";

import { getBookedSlots } from "../controllers/slotController.js";

const router = Router();

router.post("/", createAppointment);

// IMPORTANT: /slots must come before /:reference
router.get("/slots", getBookedSlots);

router.patch("/:reference/cancel", cancelAppointment);

router.patch("/:reference/reschedule", rescheduleAppointment);

router.get("/:reference", getAppointmentByReference);

export default router;
