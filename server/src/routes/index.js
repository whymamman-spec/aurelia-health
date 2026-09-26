import { Router } from "express";

import departmentRoutes from "./departments.js";
import doctorRoutes from "./doctors.js";
import appointmentRoutes from "./appointments.js";
import dashboardRoutes from "./dashboard.js";

const router = Router();

router.use("/departments", departmentRoutes);
router.use("/doctors", doctorRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
