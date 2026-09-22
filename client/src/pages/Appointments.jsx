import { useEffect, useState } from "react";
import { Calendar, Clock, User, Stethoscope, CheckCircle } from "lucide-react";

import { Button, Container, Section } from "../components";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

function Appointments() {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [form, setForm] = useState({
    patientName: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [departmentResponse, doctorResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/departments`),
          fetch(`${import.meta.env.VITE_API_URL}/api/doctors`),
        ]);

        const departmentData = await departmentResponse.json();
        const doctorData = await doctorResponse.json();

        setDepartments(departmentData);
        setDoctors(doctorData);
      } catch (error) {
        console.error("Failed to load booking data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) => String(doctor.department_id) === form.department,
  );

  useEffect(() => {
    async function fetchBookedSlots() {
      if (!form.doctor || !form.appointmentDate) {
        setBookedSlots([]);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/appointments/slots?doctorId=${form.doctor}&date=${form.appointmentDate}`,
        );

        const data = await response.json();

        if (data.success) {
          setBookedSlots(data.bookedSlots);
        }
      } catch (error) {
        console.error("Failed to load booked slots:", error);
      }
    }

    fetchBookedSlots();
  }, [form.doctor, form.appointmentDate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" ? { doctor: "" } : {}),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed");
      }

      setConfirmation({
        bookingReference: data.bookingReference,
        queueNumber: data.queueNumber,
        patientName: form.patientName,
        departmentName:
          departments.find((d) => d.id === Number(form.department))?.name || "",
        doctorName:
          filteredDoctors.find((d) => d.id === Number(form.doctor))
            ?.full_name || "",
        date: form.appointmentDate,
        time: form.appointmentTime,
      });

      setForm({
        patientName: "",
        department: "",
        doctor: "",
        appointmentDate: "",
        appointmentTime: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to connect to the server.");
    }
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Heading */}
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-wider text-aurelia-teal">
              Aurelia Health
            </p>

            <h1 className="mt-3 text-4xl font-bold text-aurelia-text">
              Book an Appointment
            </h1>

            <p className="mt-4 text-aurelia-muted">
              Choose a department, select your doctor and reserve a 30-minute
              consultation slot.
            </p>
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-aurelia-xl bg-white p-8 shadow-sm ring-1 ring-black/5"
          >
            {/* Patient Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-medium text-aurelia-text">
                <User size={18} />
                Patient Name
              </label>

              <input
                type="text"
                name="patientName"
                value={form.patientName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-aurelia-md border border-gray-300 px-4 py-3 outline-none transition focus:border-aurelia-teal"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="mb-2 block font-medium text-aurelia-text">
                Department
              </label>

              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-aurelia-md border border-gray-300 px-4 py-3 outline-none transition focus:border-aurelia-teal"
                required
              >
                <option value="">
                  {loading ? "Loading departments..." : "Select Department"}
                </option>

                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-medium text-aurelia-text">
                <Stethoscope size={18} />
                Doctor
              </label>

              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                disabled={!form.department}
                className="w-full rounded-aurelia-md border border-gray-300 px-4 py-3 outline-none transition focus:border-aurelia-teal disabled:bg-gray-100"
                required
              >
                <option value="">
                  {form.department
                    ? "Select Doctor"
                    : "Choose Department First"}
                </option>

                {filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.full_name} — {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium text-aurelia-text">
                  <Calendar size={18} />
                  Appointment Date
                </label>

                <input
                  type="date"
                  name="appointmentDate"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  className="w-full rounded-aurelia-md border border-gray-300 px-4 py-3 outline-none transition focus:border-aurelia-teal"
                  required
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-medium text-aurelia-text">
                  <Clock size={18} />
                  Time Slot
                </label>

                <select
                  name="appointmentTime"
                  value={form.appointmentTime}
                  onChange={handleChange}
                  className="w-full rounded-aurelia-md border border-gray-300 px-4 py-3 outline-none transition focus:border-aurelia-teal"
                  required
                >
                  <option value="">Select Time Slot</option>

                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);

                    return (
                      <option key={slot} value={slot} disabled={isBooked}>
                        {isBooked ? `${slot} — Booked` : slot}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Continue Booking
            </Button>
          </form>
        </div>

        {/* Confirmation Modal */}
        {confirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
              <div className="text-center">
                <CheckCircle size={64} className="mx-auto text-green-600" />

                <h2 className="mt-4 text-2xl font-bold text-aurelia-text">
                  Appointment Confirmed
                </h2>

                <p className="mt-2 text-sm text-aurelia-muted">
                  Your booking has been successfully created.
                </p>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference</span>
                  <strong>{confirmation.bookingReference}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Queue</span>
                  <strong>#{confirmation.queueNumber}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Patient</span>
                  <strong>{confirmation.patientName}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Department</span>
                  <strong>{confirmation.departmentName}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor</span>
                  <strong>{confirmation.doctorName}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <strong>{confirmation.date}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <strong>{confirmation.time}</strong>
                </div>
              </div>

              <Button
                size="lg"
                className="mt-6 w-full"
                onClick={() => setConfirmation(null)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}

export default Appointments;
