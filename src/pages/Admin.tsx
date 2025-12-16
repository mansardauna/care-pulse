import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import StatCard from "@/components/StatCard";
import DataTable from "@/components/DataTable";
import type { Status } from "@/lib/constants";

interface Appointment {
  id: string;
  patientName: string;
  status: Status;
  schedule: string;
  time: string;
  primaryPhysician: string;
  reason: string;
}

// Mock data matching Figma design
const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    status: "scheduled",
    schedule: "2024-01-15",
    time: "09:00 AM",
    primaryPhysician: "Dr. John Green",
    reason: "Annual checkup",
  },
  {
    id: "2",
    patientName: "Adrian",
    status: "pending",
    schedule: "2024-01-15",
    time: "10:30 AM",
    primaryPhysician: "Dr. Leila Cameron",
    reason: "Consultation",
  },
  {
    id: "3",
    patientName: "John Doe",
    status: "cancelled",
    schedule: "2024-01-15",
    time: "11:00 AM",
    primaryPhysician: "Dr. David Livingston",
    reason: "Follow-up",
  },
  {
    id: "4",
    patientName: "Adrian",
    status: "scheduled",
    schedule: "2024-01-16",
    time: "02:00 PM",
    primaryPhysician: "Dr. Evan Peter",
    reason: "Checkup",
  },
  {
    id: "5",
    patientName: "John Doe",
    status: "pending",
    schedule: "2024-01-16",
    time: "03:30 PM",
    primaryPhysician: "Dr. Jane Powell",
    reason: "Lab results",
  },
  {
    id: "6",
    patientName: "Adrian",
    status: "scheduled",
    schedule: "2024-01-17",
    time: "09:30 AM",
    primaryPhysician: "Dr. Alex Ramirez",
    reason: "Routine checkup",
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const hasAccess = localStorage.getItem("adminAccess");
    if (!hasAccess) {
      navigate("/");
      return;
    }

    // Load appointments from localStorage or use mock data
    const storedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    if (storedAppointments.length > 0) {
      setAppointments(storedAppointments);
    } else {
      setAppointments(mockAppointments);
      localStorage.setItem("appointments", JSON.stringify(mockAppointments));
    }
  }, [navigate]);

  const handleUpdateAppointment = (id: string, status: Status, data?: any) => {
    setAppointments((prev) => {
      const updated = prev.map((apt) =>
        apt.id === id
          ? { ...apt, status, ...data }
          : apt
      );
      localStorage.setItem("appointments", JSON.stringify(updated));
      return updated;
    });
  };

  const scheduledCount = appointments.filter((apt) => apt.status === "scheduled").length;
  const pendingCount = appointments.filter((apt) => apt.status === "pending").length;
  const cancelledCount = appointments.filter((apt) => apt.status === "cancelled").length;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 px-[5%] py-10">
      {/* Header */}
      <header className="admin-header flex items-center justify-between opacity-0 animate-fade-in">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#24AE7C]">
            <span className="text-[14px] font-semibold text-white">A</span>
          </div>
          <p className="text-[16px] font-semibold text-foreground">Admin</p>
        </div>
      </header>

      <main className="admin-main">
        {/* Welcome Section */}
        <section className="w-full space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="header text-[32px] font-bold text-foreground">Welcome, Admin</h1>
          <p className="text-dark-700 text-[16px]">Start day with managing new appointments</p>
        </section>

        {/* Stats Section */}
        <section className="admin-stat mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <StatCard count={scheduledCount} label="Total number of  scheduled appointmentss" type="scheduled" />
          </div>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <StatCard count={pendingCount} label="Total number of pending appointments" type="pending" />
          </div>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <StatCard count={cancelledCount} label="Total number of cancelled appointments" type="cancelled" />
          </div>
        </section>

        {/* Data Table */}
        <section className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <DataTable appointments={appointments} onUpdate={handleUpdateAppointment} />
        </section>
      </main>

      {/* Footer */}
      <footer className="text-[14px] text-dark-600 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        @carepulse copyright
      </footer>
    </div>
  );
};

export default Admin;
