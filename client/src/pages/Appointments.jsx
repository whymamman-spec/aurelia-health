import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  Search,
  Edit,
} from "lucide-react";

import { Button, Container, Section, ConfirmationModal } from "../components";

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

  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);

  const [rescheduleForm, setRescheduleForm] = useState({
    appointmentDate: "",
    appointmentTime: "",
  });

  const [rescheduleSlots, setRescheduleSlots] = useState([]);

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

        setDepartments(await depRes.json());
        setDoctors(await docRes.json());
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Load booked slots for booking form
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

          if (data.bookedSlots.includes(form.appointmentTime)) {
            setForm((prev) => ({
              ...prev,
              appointmentTime: "",
            }));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookedSlots();
  }, [form.doctor, form.appointmentDate]);

  // Load booked slots inside reschedule modal
  useEffect(() => {
    async function loadRescheduleSlots() {
      if (
        !showRescheduleModal ||
        !lookupResult ||
        !rescheduleForm.appointmentDate
      ) {
        setRescheduleSlots([]);
        return;
      }

      const doctor = doctors.find((d) => d.full_name === lookupResult.doctor);

      if (!doctor) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/appointments/slots?doctorId=${doctor.id}&date=${rescheduleForm.appointmentDate}`,
        );

        const data = await response.json();

        if (data.success) {
          setRescheduleSlots(data.bookedSlots);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadRescheduleSlots();
  }, [
    showRescheduleModal,
    lookupResult,
    rescheduleForm.appointmentDate,
    doctors,
  ]);

  const filteredDoctors = doctors.filter(
    (doctor) => String(doctor.department_id) === form.department,
  );

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" ? { doctor: "", appointmentTime: "" } : {}),
    }));
  }

  // BOOK APPOINTMENT
  async function handleSubmit(e) {
    e.preventDefault();

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

      if (!response.ok) throw new Error(data.message);

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
      alert(error.message);
    }
  }

  // LOOKUP
  async function handleLookup(e) {
    e.preventDefault();

    setLookupError("");
    setLookupResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/${lookupRef.toUpperCase()}`,
      );

      const data = await response.json();

      if (!response.ok) {
        setLookupError(data.message);
        return;
      }

      setLookupResult(data.appointment);
    } catch {
      setLookupError("Unable to connect to server.");
    }
  }

  // CANCEL
  async function handleCancelAppointment() {
    setIsCancelling(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/${lookupResult.booking_reference}/cancel`,
        {
          method: "PATCH",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setLookupResult((prev) => ({
        ...prev,
        status: "Cancelled",
      }));

      setShowCancelModal(false);
    } catch {
      alert("Unable to cancel appointment.");
    } finally {
      setIsCancelling(false);
    }
  }

  // RESCHEDULE
  async function handleRescheduleAppointment() {
    setIsRescheduling(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/${lookupResult.booking_reference}/reschedule`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rescheduleForm),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setLookupResult((prev) => ({
        ...prev,
        appointment_date: rescheduleForm.appointmentDate,
        appointment_time: rescheduleForm.appointmentTime,
        queue_number: data.queueNumber,
      }));

      setShowRescheduleModal(false);
    } catch {
      alert("Unable to reschedule appointment.");
    } finally {
      setIsRescheduling(false);
    }
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="font-semibold uppercase tracking-wider text-aurelia-teal">
              Aurelia Health
            </p>

            <h1 className="mt-3 text-4xl font-bold text-aurelia-text">
              Patient Portal
            </h1>

            <p className="mt-3 text-aurelia-muted">
              Book appointments or retrieve existing ones.
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
                  className="w-full rounded-xl border px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">Department</label>

                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                  required
                >
                  <option value="">
                    {loading ? "Loading..." : "Select Department"}
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
                  className="w-full rounded-xl border px-4 py-3"
                  required
                >
                  <option value="">Select Doctor</option>

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
                    className="w-full rounded-xl border px-4 py-3"
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
                    className="w-full rounded-xl border px-4 py-3"
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
                    value={lookupRef}
                    onChange={(e) => setLookupRef(e.target.value.toUpperCase())}
                    placeholder="AUR-XXXXXX"
                    className="w-full rounded-xl border px-4 py-3 uppercase"
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

                      <p
                        className={`text-sm font-medium ${
                          lookupResult.status === "Cancelled"
                            ? "text-red-600"
                            : "text-green-700"
                        }`}
                      >
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

                  {lookupResult.status === "Confirmed" && (
                    <>
                      <Button
                        className="mt-5 w-full"
                        onClick={() => {
                          setRescheduleForm({
                            appointmentDate: lookupResult.appointment_date,
                            appointmentTime: lookupResult.appointment_time,
                          });

                          setShowRescheduleModal(true);
                        }}
                      >
                        <Edit size={18} />
                        Reschedule Appointment
                      </Button>

                      <Button
                        variant="outline"
                        className="mt-3 w-full border-red-600 text-red-600 hover:bg-red-50"
                        onClick={() => setShowCancelModal(true)}
                      >
                        Cancel Appointment
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* RESCHEDULE MODAL */}
          {showRescheduleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-3xl bg-white p-6">
                <h2 className="text-2xl font-bold">Reschedule Appointment</h2>

                <p className="mt-2 text-sm text-gray-600">
                  Your booking reference will remain the same.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block font-medium">New Date</label>

                    <input
                      type="date"
                      value={rescheduleForm.appointmentDate}
                      onChange={(e) =>
                        setRescheduleForm((prev) => ({
                          ...prev,
                          appointmentDate: e.target.value,
                          appointmentTime: "",
                        }))
                      }
                      className="w-full rounded-xl border px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">New Time</label>

                    <select
                      value={rescheduleForm.appointmentTime}
                      onChange={(e) =>
                        setRescheduleForm((prev) => ({
                          ...prev,
                          appointmentTime: e.target.value,
                        }))
                      }
                      className="w-full rounded-xl border px-4 py-3"
                    >
                      <option value="">Select Time</option>

                      {timeSlots.map((slot) => {
                        const booked =
                          rescheduleSlots.includes(slot) &&
                          slot !== lookupResult.appointment_time;

                        return (
                          <option key={slot} value={slot} disabled={booked}>
                            {booked ? `${slot} — Booked` : slot}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowRescheduleModal(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="flex-1"
                    onClick={handleRescheduleAppointment}
                    disabled={isRescheduling}
                  >
                    {isRescheduling ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* CANCEL MODAL */}
          <ConfirmationModal
            isOpen={showCancelModal}
            title="Cancel Appointment?"
            message="This will cancel your appointment and immediately release your time slot for other patients."
            confirmText="Yes, Cancel"
            cancelText="Keep Appointment"
            loading={isCancelling}
            onCancel={() => setShowCancelModal(false)}
            onConfirm={handleCancelAppointment}
          />

          {/* BOOKING CONFIRMATION */}
          {confirmation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <div className="text-center">
                  <CheckCircle size={64} className="mx-auto text-green-600" />

                  <h2 className="mt-4 text-2xl font-bold">
                    Appointment Confirmed
                  </h2>
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
