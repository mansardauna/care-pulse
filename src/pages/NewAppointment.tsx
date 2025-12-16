import Logo from "@/components/Logo";
import AppointmentForm from "@/components/forms/AppointmentForm";
import appointmentImg from "@/assets/appointment-img.png";

const NewAppointment = () => {
  const registeredPatient = JSON.parse(localStorage.getItem("registeredPatient") || "{}");
  const patientName = `${registeredPatient.firstName || ""} ${registeredPatient.lastName || ""}`.trim();

  return (
    <div className="flex min-h-screen max-h-screen">
      {/* Left Section - Form */}
      <section className="remove-scrollbar container flex-1 overflow-y-auto">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="opacity-0 animate-fade-in">
            <Logo className="mb-12" />
          </div>

          <section className="mb-12 space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="header text-[32px] font-bold text-foreground">
              New Appointment
            </h1>
            <p className="text-dark-700">
              {patientName ? `Request a new appointment for ${patientName} in 10 seconds.` : "Request a new appointment in 10 seconds."}
            </p>
          </section>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <AppointmentForm />
          </div>

          <div className="mt-16 flex items-center justify-center text-[14px] opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-dark-600">© 2024 CarePulse</p>
          </div>
        </div>
      </section>

      {/* Right Section - Image */}
      <section className="sticky top-0 hidden h-screen max-w-[390px] overflow-hidden lg:block">
        <div className="relative h-full w-full">
          <img
            src={appointmentImg}
            alt="Doctor with tablet"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
        </div>
      </section>
    </div>
  );
};

export default NewAppointment;
