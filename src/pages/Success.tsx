import { Link, useParams } from "react-router-dom";
import { CalendarCheck, Calendar } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/lib/constants";
import { format } from "date-fns";

const Success = () => {
  const { userId } = useParams();
  const latestAppointment = JSON.parse(localStorage.getItem("latestAppointment") || "{}");
  const registeredPatient = JSON.parse(localStorage.getItem("registeredPatient") || "{}");

  const doctor = Doctors.find((doc) => doc.name === latestAppointment.primaryPhysician) || Doctors[0];

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img flex flex-col items-center justify-center w-full">
        <div className="opacity-0 animate-fade-in">
          <Logo className="mb-12" />
        </div>

        <section className="flex flex-col items-center">
          <div className="mb-6 flex h-fit w-fit items-center justify-center rounded-full animate-float opacity-0 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CalendarCheck className="h-24 w-24 text-primary" />
          </div>

          <h2 className="header mb-6 max-w-[600px] text-center text-[36px] font-bold leading-tight opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Your <span className="text-primary">appointment request</span> has been successfully submitted!
          </h2>

          <p className="text-dark-700 mb-9 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            We'll be in touch shortly to confirm.
          </p>
        </section>

        <section className="request-details opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex w-full flex-col items-center gap-8 rounded-2xl border border-dark-500 bg-dark-400 p-6 sm:min-w-[350px] sm:flex-row">
            <div className="flex items-center gap-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-14 w-14 rounded-full border-2 border-dark-500 object-cover"
              />
              <div>
                <p className="font-semibold text-foreground">{doctor.name}</p>
                <p className="text-[14px] text-dark-700">{doctor.specialty}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <p className="text-[14px] text-dark-700">
                {latestAppointment.schedule && format(new Date(latestAppointment.schedule), "MMMM dd, yyyy")}
                {latestAppointment.time && ` • ${latestAppointment.time}`}
              </p>
            </div>
          </div>
        </section>

        <Link to={`/patients/${userId}/new-appointment`} className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button className="shad-primary-btn px-8">
            New Appointment
          </Button>
        </Link>

        <p className="text-dark-600 text-[14px] mt-auto py-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          © 2024 CarePulse
        </p>
      </div>
    </div>
  );
};

export default Success;
