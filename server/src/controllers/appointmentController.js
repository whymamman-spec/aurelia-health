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

export async function getAppointmentByReference(req, res) {
  let db;

  try {
    const { reference } = req.params;

    db = await connectDatabase();

    const appointment = await db.get(
      `SELECT
          appointments.booking_reference,
          appointments.patient_name,
          appointments.appointment_date,
          appointments.appointment_time,
          appointments.queue_number,
          appointments.status,
          departments.name AS department,
          doctors.full_name AS doctor
       FROM appointments
       JOIN departments
         ON appointments.department_id = departments.id
       JOIN doctors
         ON appointments.doctor_id = doctors.id
       WHERE appointments.booking_reference = ?`,
      [reference],
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Lookup error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve appointment.",
    });
  } finally {
    if (db) await db.close();
  }
}

export async function cancelAppointment(req, res) {
  let db;

  try {
    const { reference } = req.params;

    db = await connectDatabase();

    const appointment = await db.get(
      `SELECT id, status
       FROM appointments
       WHERE booking_reference = ?`,
      [reference],
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment has already been cancelled.",
      });
    }

    await db.run(
      `UPDATE appointments
       SET status = 'Cancelled'
       WHERE booking_reference = ?`,
      [reference],
    );

    res.json({
      success: true,
      message: "Appointment cancelled successfully.",
    });
  } catch (error) {
    console.error("Cancellation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to cancel appointment.",
    });
  } finally {
    if (db) await db.close();
  }
}

export async function rescheduleAppointment(req, res) {
  let db;

  try {
    const { reference } = req.params;
    const { appointmentDate, appointmentTime } = req.body;

    if (!appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: "Date and time are required.",
      });
    }

    db = await connectDatabase();

    const appointment = await db.get(
      `SELECT doctor_id, status
       FROM appointments
       WHERE booking_reference = ?`,
      [reference],
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    if (appointment.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled appointments cannot be rescheduled.",
      });
    }

    const existing = await db.get(
      `SELECT id
       FROM appointments
       WHERE doctor_id = ?
         AND appointment_date = ?
         AND appointment_time = ?
         AND status = 'Confirmed'
         AND booking_reference != ?`,
      [appointment.doctor_id, appointmentDate, appointmentTime, reference],
    );

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "That time slot is already booked.",
      });
    }

    const queue = await db.get(
      `SELECT COUNT(*) AS total
       FROM appointments
       WHERE doctor_id = ?
         AND appointment_date = ?
         AND status = 'Confirmed'
         AND booking_reference != ?`,
      [appointment.doctor_id, appointmentDate, reference],
    );

    const newQueue = queue.total + 1;

    await db.run(
      `UPDATE appointments
       SET appointment_date = ?,
           appointment_time = ?,
           queue_number = ?
       WHERE booking_reference = ?`,
      [appointmentDate, appointmentTime, newQueue, reference],
    );

    res.json({
      success: true,
      queueNumber: newQueue,
      message: "Appointment rescheduled successfully.",
    });
  } catch (error) {
    console.error("Reschedule error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to reschedule appointment.",
    });
  } finally {
    if (db) await db.close();
  }
}
