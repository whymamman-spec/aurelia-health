import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";

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
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    patientName: "",
    department: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/departments`,
        );

        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to load departments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartments();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
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

      if (data.success) {
        alert(
          `Booking Successful!

Reference: ${data.bookingReference}

Queue Number: ${data.queueNumber}`,
        );

        setForm({
          patientName: "",
          department: "",
          appointmentDate: "",
          appointmentTime: "",
        });
      }
    } catch (error) {
      console.error(error);

      alert("Unable to connect to server.");
    }
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <p className="font-semibold uppercase tracking-wider text-aurelia-teal">
              Aurelia Health
            </p>

            <h1 className="mt-3 text-4xl font-bold text-aurelia-text">
              Book an Appointment
            </h1>

            <p className="mt-4 text-aurelia-muted">
              Select a department and your preferred date. Live doctor booking
              will come next.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-aurelia-xl bg-white p-8 shadow-sm ring-1 ring-black/5"
          >
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
                  Preferred Time
                </label>

                <select
                  name="appointmentTime"
                  value={form.appointmentTime}
                  onChange={handleChange}
                  className="w-full rounded-aurelia-md border border-gray-300 px-4 py-3 outline-none transition focus:border-aurelia-teal"
                  required
                >
                  <option value="">Select Time Slot</option>

                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Continue Booking
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

export default Appointments;
