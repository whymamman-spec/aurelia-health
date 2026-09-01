import { Router } from "express";
import departmentRoutes from "./departments.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Aurelia Health API",
    version: "1.0.0",
    status: "Running",
  });
});

router.use("/departments", departmentRoutes);

export default router;
