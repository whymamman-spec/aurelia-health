import { connectDatabase } from "../config/database.js";

export async function getDepartments(req, res) {
  try {
    const db = await connectDatabase();

    const departments = await db.all(`
      SELECT id, name
      FROM departments
      ORDER BY name ASC
    `);

    res.json(departments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch departments",
    });
  }
}
