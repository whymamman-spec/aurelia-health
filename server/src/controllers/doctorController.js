import { connectDatabase } from "../config/database.js";

export async function getDoctors(req, res) {
  try {
    const db = await connectDatabase();

    const doctors = await db.all(`
      SELECT
        doctors.id,
        doctors.full_name,
        doctors.specialty,
        doctors.experience_years,
        doctors.consultation_fee,
        doctors.image,
        departments.name AS department
      FROM doctors
      JOIN departments
      ON doctors.department_id = departments.id
      WHERE doctors.available = 1
      ORDER BY doctors.full_name;
    `);

    res.json(doctors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch doctors",
    });
  }
}
