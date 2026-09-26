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
    console.error("Appointment lookup error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve appointment.",
    });
  } finally {
    if (db) {
      await db.close();
    }
  }
}

export async function cancelAppointment(req, res) {
  let db;

  try {
    const { reference } = req.params;

    db = await connectDatabase();

    const result = await db.run(
      `UPDATE appointments
       SET status = 'Cancelled'
       WHERE booking_reference = ?
       AND status = 'Confirmed'`,
      [reference],
    );

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or already cancelled.",
      });
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully.",
    });
  } catch (error) {
    console.error("Appointment cancellation error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to cancel appointment.",
    });
  } finally {
    if (db) {
      await db.close();
    }
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
        message: "Appointment date and time are required.",
      });
    }

    db = await connectDatabase();

    // Get the existing appointment
    const existingAppointment = await db.get(
      `SELECT *
       FROM appointments
       WHERE booking_reference = ?
       AND status = 'Confirmed'`,
      [reference],
    );

    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Confirmed appointment not found.",
      });
    }

    // Make sure the new slot isn't already booked
    const existingSlot = await db.get(
      `SELECT id
       FROM appointments
       WHERE doctor_id = ?
       AND appointment_date = ?
       AND appointment_time = ?
       AND status = 'Confirmed'
       AND booking_reference != ?`,
      [
        existingAppointment.doctor_id,
        appointmentDate,
        appointmentTime,
        reference,
      ],
    );

    if (existingSlot) {
      return res.status(409).json({
        success: false,
        message: "That appointment slot is already booked.",
      });
    }

    await db.run(
      `UPDATE appointments
       SET appointment_date = ?,
           appointment_time = ?
       WHERE booking_reference = ?`,
      [appointmentDate, appointmentTime, reference],
    );

    res.json({
      success: true,
      message: "Appointment rescheduled successfully.",
    });
  } catch (error) {
    console.error("Appointment rescheduling error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to reschedule appointment.",
    });
  } finally {
    if (db) {
      await db.close();
    }
  }
}
