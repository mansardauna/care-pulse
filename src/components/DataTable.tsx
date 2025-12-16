import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import AppointmentModal from "./AppointmentModal";
import { Doctors, type Status } from "@/lib/constants";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  status: Status;
  schedule: string;
  time: string;
  primaryPhysician: string;
  reason: string;
}

interface DataTableProps {
  appointments: Appointment[];
  onUpdate: (id: string, status: Status, data?: any) => void;
}

const getInitials = (name: string) => {
  if (!name || typeof name !== "string") return "?";

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
};

// Utility function to generate a consistent random color from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Generate a bright, pleasant hue
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};


const DataTable = ({ appointments, onUpdate }: DataTableProps) => {
  const getDoctor = (name: string) => {
    return Doctors.find((doc) => doc.name === name) || Doctors[0];
  };

  return (
    <>
    <div className="data-table">
      <Table>
        <TableHeader className="bg-dark-400">
          <TableRow className="border-b border-dark-500 hover:bg-transparent">
            <TableHead className="py-5 text-[12px] font-medium uppercase tracking-wider text-dark-700">Patient</TableHead>
            <TableHead className="py-5 text-[12px] font-medium uppercase tracking-wider text-dark-700">Date</TableHead>
            <TableHead className="py-5 text-[12px] font-medium uppercase tracking-wider text-dark-700">Status</TableHead>
            <TableHead className="py-5 text-[12px] font-medium uppercase tracking-wider text-dark-700">Doctor</TableHead>
            <TableHead className="py-5 text-right text-[12px] font-medium uppercase tracking-wider text-dark-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.length === 0 ? (
            <TableRow className="border-b border-dark-500 hover:bg-dark-400/50">
              <TableCell colSpan={5} className="h-32 text-center text-[14px] text-dark-600">
                No appointments found. When patients book appointments, they will appear here.
              </TableCell>
            </TableRow>
          ) : (
            appointments.map((appointment, index) => {
              const doctor = getDoctor(appointment.primaryPhysician);
              return (
                <TableRow 
                  key={appointment.id} 
                  className="border-b border-dark-500 transition-colors duration-200 hover:bg-dark-400/50"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
               <TableCell className="py-3">
  <div className="flex items-center gap-3">
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full text-white"
      style={{
        backgroundColor: stringToColor(appointment.patientName || "?"),
      }}
    >
      <span className="text-[16px] font-semibold">
        {getInitials(appointment.patientName)}
      </span>
    </div>
    <span className="text-[14px] font-medium text-foreground">
      {appointment.patientName}
    </span>
  </div>
</TableCell>
                  <TableCell className="py-4 text-[14px] text-dark-700">
                    {appointment.schedule && format(new Date(appointment.schedule), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="py-4">
                    <StatusBadge status={appointment.status} />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-8 w-8 rounded-full border border-dark-500 object-cover"
                      />
                      <span className="text-[14px] text-foreground">{doctor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <div className="flex justify-end gap-4">
                      {appointment.status === "pending" && (
                        <>
                          <AppointmentModal
                            type="schedule"
                            appointmentId={appointment.id}
                            patientName={appointment.patientName}
                            onUpdate={onUpdate}
                          />
                          <AppointmentModal
                            type="cancel"
                            appointmentId={appointment.id}
                            patientName={appointment.patientName}
                            onUpdate={onUpdate}
                          />
                        </>
                      )}
                      {appointment.status === "scheduled" && (
                        <AppointmentModal
                          type="cancel"
                          appointmentId={appointment.id}
                          patientName={appointment.patientName}
                          onUpdate={onUpdate}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
        </div>
      {/* Pagination */}
      <div className="flex items-center justify-between  px-4 py-4">
        <button className="flex items-center gap-1 text-[14px] text-dark-700 hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button className="flex items-center gap-1 text-[14px] text-dark-700 hover:text-foreground transition-colors">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
  
    </>
  );
};

export default DataTable;
