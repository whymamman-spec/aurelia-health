import { connectDatabase } from "../config/database.js";

export async function getTodayAppointments(req, res) {
  let db;

  try {
    db = await connectDatabase();

    const today = new Date().toISOString().split("T")[0];

    const appointments = await db.all(
      `
      SELECT
        appointments.id,
        appointments.patient_name,
        appointments.appointment_date,
        appointments.appointment_time,
        appointments.status,
        appointments.queue_number,
        doctors.full_name AS doctor,
        departments.name AS department
      FROM appointments
      JOIN doctors
        ON appointments.doctor_id = doctors.id
      JOIN departments
        ON appointments.department_id = departments.id
      WHERE appointments.appointment_date = ?
      ORDER BY appointments.appointment_time ASC
      `,
      [today],
    );

    const confirmed = appointments.filter(
      (a) => a.status === "Confirmed",
    ).length;

    const cancelled = appointments.filter(
      (a) => a.status === "Cancelled",
    ).length;

    res.json({
      success: true,
      date: today,
      summary: {
        total: appointments.length,
        confirmed,
        cancelled,
        departments: 13,
      },
      appointments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to load dashboard.",
    });
  } finally {
    if (db) await db.close();
  }
}
