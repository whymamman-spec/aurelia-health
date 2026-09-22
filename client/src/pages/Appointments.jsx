import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  Search,
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("book");

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(null);

  const [lookupRef, setLookupRef] = useState("");
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState("");

  const [form, setForm] = useState({
    patientName: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  // Load departments and doctors
  useEffect(() => {
    async function loadData() {
      try {
        const [depRes, docRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/departments`),
          fetch(`${import.meta.env.VITE_API_URL}/api/doctors`),
        ]);

        const depData = await depRes.json();
        const docData = await docRes.json();

        setDepartments(depData);
        setDoctors(docData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Load booked slots whenever doctor or date changes
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

          // Reset selected time if it has become unavailable
          if (data.bookedSlots.includes(form.appointmentTime)) {
            setForm((prev) => ({
              ...prev,
              appointmentTime: "",
            }));
          }
        }
      } catch (error) {
        console.error("Failed to load booked slots:", error);
      }
    }

    fetchBookedSlots();
  }, [form.doctor, form.appointmentDate]);

  const filteredDoctors = doctors.filter(
    (doctor) => String(doctor.department_id) === form.department,
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" ? { doctor: "", appointmentTime: "" } : {}),
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

      setBookedSlots([]);
    } catch (error) {
      console.error(error);
      alert(error.message || "Booking failed");
    }
  }

  async function handleLookup(event) {
    event.preventDefault();

    setLookupResult(null);
    setLookupError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/${lookupRef.toUpperCase()}`,
      );

      const data = await response.json();

      if (!response.ok) {
        setLookupError(data.message || "Appointment not found.");
        return;
      }

      setLookupResult(data.appointment);
    } catch {
      setLookupError("Unable to connect to the server.");
    }
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="font-semibold uppercase tracking-wider text-aurelia-teal">
              Aurelia Health
            </p>

            <h1 className="mt-3 text-4xl font-bold text-aurelia-text">
              Patient Portal
            </h1>

            <p className="mt-3 text-aurelia-muted">
              Book appointments or retrieve an existing appointment using your
              booking reference.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex rounded-full bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("book")}
              className={`flex-1 rounded-full py-3 font-semibold transition ${
                activeTab === "book"
                  ? "bg-aurelia-teal text-white"
                  : "text-gray-600"
              }`}
            >
              Book Appointment
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("lookup")}
              className={`flex-1 rounded-full py-3 font-semibold transition ${
                activeTab === "lookup"
                  ? "bg-aurelia-teal text-white"
                  : "text-gray-600"
              }`}
            >
              Find My Appointment
            </button>
          </div>

          {/* BOOK TAB */}
          {activeTab === "book" && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5"
            >
              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <User size={18} />
                  Patient Name
                </label>

                <input
                  type="text"
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Department</label>

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
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

              <div>
                <label className="mb-2 flex items-center gap-2 font-medium">
                  <Stethoscope size={18} />
                  Doctor
                </label>

                <select
                  name="doctor"
                  value={form.doctor}
                  onChange={handleChange}
                  disabled={!form.department}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 disabled:bg-gray-100"
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

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Calendar size={18} />
                    Date
                  </label>

                  <input
                    type="date"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Clock size={18} />
                    Time Slot
                  </label>

                  <select
                    name="appointmentTime"
                    value={form.appointmentTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                    required
                  >
                    <option value="">Select Time</option>

                    {timeSlots.map((slot) => {
                      const booked = bookedSlots.includes(slot);

                      return (
                        <option key={slot} value={slot} disabled={booked}>
                          {booked ? `${slot} — Booked` : slot}
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
          )}

          {/* LOOKUP TAB */}
          {activeTab === "lookup" && (
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <form onSubmit={handleLookup} className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 font-medium">
                    <Search size={18} />
                    Booking Reference
                  </label>

                  <input
                    type="text"
                    value={lookupRef}
                    onChange={(e) => setLookupRef(e.target.value.toUpperCase())}
                    placeholder="AUR-XXXXXX"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 uppercase"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Find Appointment
                </Button>
              </form>

              {lookupError && (
                <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
                  {lookupError}
                </div>
              )}

              {lookupResult && (
                <div className="mt-6 rounded-2xl bg-green-50 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <CheckCircle size={32} className="text-green-600" />

                    <div>
                      <h3 className="font-bold text-green-800">
                        Appointment Found
                      </h3>

                      <p className="text-sm text-green-700">
                        Status: {lookupResult.status}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Patient</span>
                      <strong>{lookupResult.patient_name}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Doctor</span>
                      <strong>{lookupResult.doctor}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Department</span>
                      <strong>{lookupResult.department}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Date</span>
                      <strong>{lookupResult.appointment_date}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Time</span>
                      <strong>{lookupResult.appointment_time}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Queue</span>
                      <strong>#{lookupResult.queue_number}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Reference</span>
                      <strong>{lookupResult.booking_reference}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirmation Modal */}
          {confirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <div className="text-center">
                  <CheckCircle size={64} className="mx-auto text-green-600" />

                  <h2 className="mt-4 text-2xl font-bold">
                    Appointment Confirmed
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Please keep your booking reference.
                  </p>
                </div>

                <div className="mt-6 space-y-3 rounded-2xl bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <span>Reference</span>
                    <strong>{confirmation.bookingReference}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Queue</span>
                    <strong>#{confirmation.queueNumber}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Patient</span>
                    <strong>{confirmation.patientName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Doctor</span>
                    <strong>{confirmation.doctorName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Department</span>
                    <strong>{confirmation.departmentName}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Date</span>
                    <strong>{confirmation.date}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Time</span>
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
        </div>
      </Container>
    </Section>
  );
}

export default Appointments;
