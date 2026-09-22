import { Router } from "express";

import {
  createAppointment,
  getAppointmentByReference,
  cancelAppointment,
} from "../controllers/appointmentController.js";

import { getBookedSlots } from "../controllers/slotController.js";

const router = Router();

router.post("/", createAppointment);

router.get("/slots", getBookedSlots);

router.get("/:reference", getAppointmentByReference);

router.patch("/:reference/cancel", cancelAppointment);

export default router;
