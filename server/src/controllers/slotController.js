import { connectDatabase } from "../config/database.js";

export async function getBookedSlots(req, res) {
  let db;

  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({
        success: false,
        message: "doctorId and date are required.",
      });
    }

    db = await connectDatabase();

    const slots = await db.all(
      `SELECT appointment_time
       FROM appointments
       WHERE doctor_id = ?
       AND appointment_date = ?
       AND status = 'Confirmed'
       ORDER BY appointment_time`,
      [doctorId, date],
    );

    res.json({
      success: true,
      bookedSlots: slots.map((slot) => slot.appointment_time),
    });
  } catch (error) {
    console.error("Slot lookup error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve booked slots.",
    });
  } finally {
    if (db) {
      await db.close();
    }
  }
}
