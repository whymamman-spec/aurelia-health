import { Router } from "express";
import departmentRoutes from "./departments.js";
import doctorRoutes from "./doctors.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Aurelia Health API",
    version: "1.0.0",
    status: "Running",
  });
});

router.use("/departments", departmentRoutes);
router.use("/doctors", doctorRoutes);

export default router;
