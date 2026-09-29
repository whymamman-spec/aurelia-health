import { Router } from "express";

import {
  createAppointment,
  getAppointmentByReference,
  cancelAppointment,
  rescheduleAppointment,
  checkInAppointment,
  startConsultation,
  completeConsultation,
} from "../controllers/appointmentController.js";

import { getBookedSlots } from "../controllers/slotController.js";

const router = Router();

router.post("/", createAppointment);

// IMPORTANT: /slots must come before /:reference
router.get("/slots", getBookedSlots);

router.patch("/:reference/cancel", cancelAppointment);

router.patch("/:reference/reschedule", rescheduleAppointment);

// Reception workflow
router.patch("/:reference/checkin", checkInAppointment);

router.patch("/:reference/start", startConsultation);

router.patch("/:reference/complete", completeConsultation);

router.get("/:reference", getAppointmentByReference);

export default router;
