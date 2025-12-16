import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import onboardingImg from "@/assets/onboarding-img.png";

const Index = () => {
  const [showPasskey, setShowPasskey] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Form */}
      <section className="remove-scrollbar flex flex-1 flex-col overflow-y-auto items-center">
        <div className="sub-container mx-auto h-screen justify-between flex w-full max-w-[496px] flex-col py-32 ">
          <div className="opacity-0 animate-fade-in">
            <Logo className="mb-12" />
          </div>

<div className="">
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="header mb-2 text-[32px] font-bold leading-tight text-foreground">
              Hi there, ....
            </h1>
            <p className="text-dark-700 mb-9">
              Schedule your first appointment.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <PatientForm />
          </div>
          </div>

          <div className="mt-16 flex items-center justify-between text-sm opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <p className="text-dark-600 text-[14px]">@carepulse copyright</p>
            <button
              onClick={() => setShowPasskey(true)}
              className="text-primary hover:text-green-400 font-medium transition-colors duration-200"
            >
              Admin
            </button>
          </div>
        </div>
      </section>

      {/* Right Section - Image */}
      <section className="hidden w-[50%] xl:block">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src={onboardingImg}
            alt="Healthcare professionals"
            className="side-img h-full w-full  object-center"
          />
        </div>
      </section>

      <PasskeyModal open={showPasskey} onOpenChange={setShowPasskey} />
    </div>
  );
};

export default Index;
