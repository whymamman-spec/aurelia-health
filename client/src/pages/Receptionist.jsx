import { useEffect, useState } from "react";
import { Container, Section } from "../components";

function Receptionist() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard/today`,
        );

        const data = await response.json();

        if (data.success) {
          setDashboard(data);
        }
      } catch (error) {
        console.error("Dashboard loading failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const summary = dashboard?.summary ?? {
    total: 0,
    confirmed: 0,
    cancelled: 0,
    departments: 13,
  };

  const appointments = dashboard?.appointments ?? [];

  return (
    <Section>
      <Container>
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-wider text-aurelia-teal">
            Reception Desk
          </p>

          <h1 className="mt-2 text-4xl font-bold text-aurelia-text">
            Receptionist Dashboard
          </h1>

          <p className="mt-3 text-aurelia-muted">
            View today's appointments, monitor patient flow and manage clinic
            operations.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-aurelia-muted">Today's Appointments</p>
            <h2 className="mt-2 text-3xl font-bold text-aurelia-teal">
              {loading ? "…" : summary.total}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-aurelia-muted">Confirmed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {loading ? "…" : summary.confirmed}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-aurelia-muted">Cancelled</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {loading ? "…" : summary.cancelled}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="text-sm text-aurelia-muted">Departments</p>
            <h2 className="mt-2 text-3xl font-bold text-aurelia-coral">
              {summary.departments}
            </h2>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="border-b bg-aurelia-teal px-6 py-4">
            <h3 className="text-lg font-semibold text-white">
              Today's Schedule
            </h3>
          </div>

          {loading ? (
            <div className="p-8 text-center text-aurelia-muted">
              Loading appointments...
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-aurelia-muted">
              No appointments scheduled for today.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="px-6 py-3 text-sm font-semibold">Time</th>
                    <th className="px-6 py-3 text-sm font-semibold">Patient</th>
                    <th className="px-6 py-3 text-sm font-semibold">Doctor</th>
                    <th className="px-6 py-3 text-sm font-semibold">
                      Department
                    </th>
                    <th className="px-6 py-3 text-sm font-semibold">Queue</th>
                    <th className="px-6 py-3 text-sm font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="border-t">
                      <td className="px-6 py-4 font-medium">
                        {appt.appointment_time}
                      </td>

                      <td className="px-6 py-4">{appt.patient_name}</td>

                      <td className="px-6 py-4">{appt.doctor}</td>

                      <td className="px-6 py-4">{appt.department}</td>

                      <td className="px-6 py-4">#{appt.queue_number}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            appt.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default Receptionist;
