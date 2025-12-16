import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock } from "lucide-react";
import { Doctors } from "@/lib/constants";

const formSchema = z.object({
  primaryPhysician: z.string().min(1, "Please select a physician"),
  schedule: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  reason: z.string().min(10, "Please provide a reason for the appointment (at least 10 characters)"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const registeredPatient = JSON.parse(localStorage.getItem("registeredPatient") || "{}");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryPhysician: registeredPatient.primaryPhysician || "",
      schedule: "",
      time: "",
      reason: "",
      note: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const appointmentData = {
      ...values,
      patientId: userId,
      patientName: `${registeredPatient.firstName} ${registeredPatient.lastName}`,
      status: "pending",
      id: Math.random().toString(36).substring(7),
    };
    
    // Store appointments in localStorage
    const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    existingAppointments.push(appointmentData);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));
    localStorage.setItem("latestAppointment", JSON.stringify(appointmentData));
    
    navigate(`/patients/${userId}/new-appointment/success`);
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <FormField
          control={form.control}
          name="primaryPhysician"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-dark-700 text-[14px]">Doctor</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="shad-select-trigger">
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="shad-select-content">
                  {Doctors.map((doctor) => (
                    <SelectItem key={doctor.name} value={doctor.name} className="cursor-pointer hover:bg-dark-400">
                      <div className="flex items-center gap-3">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="h-9 w-9 rounded-full border border-dark-500 object-cover"
                        />
                        <div>
                          <p className="text-[14px] font-medium text-foreground">{doctor.name}</p>
                          <p className="text-[12px] text-dark-600">{doctor.specialty}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 text-[12px]" />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Expected Appointment Date</FormLabel>
                <FormControl>
                  <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <Calendar className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                    <Input
                      type="date"
                      className="shad-input border-0 focus-visible:ring-0"
                      min={new Date().toISOString().split("T")[0]}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Expected Time</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <Clock className="mr-2 h-5 w-5 text-dark-600" />
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-select-content">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="cursor-pointer hover:bg-dark-400">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Reason for Appointment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Annual monthly check-up"
                    className="shad-textarea"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Additional Comments/Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Prefer afternoon appointments, if possible"
                    className="shad-textarea"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="shad-primary-btn w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Submitting...
            </div>
          ) : (
            "Submit Appointment"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;
