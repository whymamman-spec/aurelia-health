import { connectDatabase } from "../config/database.js";
import { generateReference } from "../utils/generateReference.js";

export async function createAppointment(req, res) {
  let db;

  try {
    const {
      patientName,
      department,
      doctor,
      appointmentDate,
      appointmentTime,
    } = req.body;

    if (
      !patientName ||
      !department ||
      !doctor ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "All appointment fields are required.",
      });
    }

    db = await connectDatabase();

    const result = await db.get(
      `SELECT COUNT(*) AS total
       FROM appointments
       WHERE department_id = ?
       AND appointment_date = ?`,
      [department, appointmentDate],
    );

    const queueNumber = result.total + 1;

    const bookingReference = generateReference();

    await db.run(
      `INSERT INTO appointments (
        booking_reference,
        patient_name,
        department_id,
        doctor_id,
        appointment_date,
        appointment_time,
        queue_number
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        bookingReference,
        patientName,
        department,
        doctor,
        appointmentDate,
        appointmentTime,
        queueNumber,
      ],
    );

    res.status(201).json({
      success: true,
      bookingReference,
      queueNumber,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.error("Appointment booking error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to book appointment.",
    });
  } finally {
    if (db) {
      await db.close();
    }
  }
}
