import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Doctors } from "@/lib/constants";
import type { Status } from "@/lib/constants";

interface AppointmentModalProps {
  type: "schedule" | "cancel";
  appointmentId: string;
  patientName: string;
  onUpdate: (id: string, status: Status, data?: any) => void;
}

const AppointmentModal = ({ type, appointmentId, patientName, onUpdate }: AppointmentModalProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (type === "schedule") {
      onUpdate(appointmentId, "scheduled", {
        primaryPhysician: selectedDoctor,
        schedule,
        reason: appointmentReason,
      });
    } else {
      onUpdate(appointmentId, "cancelled", {
        cancellationReason: reason,
      });
    }

    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={
            type === "schedule"
              ? "text-[14px] font-medium text-[#24AE7C] hover:text-[#1a8f62] transition-colors"
              : "text-[14px] font-medium text-foreground hover:text-dark-700 transition-colors"
          }
        >
          {type === "schedule" ? "Schedule" : "Cancel"}
        </button>
      </DialogTrigger>
      <DialogContent className="border-dark-500 bg-dark-300 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {type === "schedule" ? "Schedule Appointment" : "Cancel Appointment"}
          </DialogTitle>
          <DialogDescription className="text-dark-700">
            {type === "schedule"
              ? `Please fill in the following details to schedule the appointment`
              : `Are you sure you want to cancel your appointment?`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {type === "schedule" ? (
            <>
              <div className="space-y-2">
                <Label className="text-dark-700">Doctor</Label>
                <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
                  <SelectTrigger className="shad-select-trigger">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent className="shad-select-content">
                    {Doctors.map((doctor) => (
                      <SelectItem key={doctor.name} value={doctor.name}>
                        <div className="flex items-center gap-3">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span>{doctor.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-dark-700">Reason for appointment</Label>
                <Textarea
                  placeholder="ex: Annual monthly check-up"
                  className="shad-textarea"
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-dark-700">Expected appointment date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-600" />
                  <Input
                    type="date"
                    className="shad-input-icon"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label className="text-dark-700">Reason for cancellation</Label>
              <Textarea
                placeholder="ex: Urgent meeting came up"
                className="shad-textarea"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || (type === "schedule" && (!selectedDoctor || !schedule)) || (type === "cancel" && !reason)}
          className={type === "schedule" ? "shad-primary-btn w-full" : "shad-danger-btn w-full"}
        >
          {isLoading ? "Processing..." : type === "schedule" ? "Schedule Appointment" : "Cancel Appointment"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
