import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";

interface OTPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientId: string;
}

const OTPModal = ({ open, onOpenChange, patientId }: OTPModalProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const correctOTP = "123456";

  useEffect(() => {
    if (!open) {
      setOtp("");
      setError("");
    }
  }, [open]);

  const handleValidate = async () => {
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (otp === correctOTP) {
      onOpenChange(false);
      navigate(`/patients/${patientId}/register`);
    } else {
      setError("Invalid OTP. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="shad-dialog border-dark-500 bg-dark-400 sm:max-w-[425px] p-0 overflow-hidden">
        <div className="absolute right-4 top-4">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-5 w-5 text-dark-600" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[18px] font-bold text-foreground">
              Access Verification
            </DialogTitle>
            <DialogDescription className="text-[14px] text-dark-700 mt-2">
              To verify your identity, please enter the OTP sent to your email/phone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                setError("");
              }}
            >
              <InputOTPGroup className="shad-otp gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="shad-otp-slot flex h-12 w-10 items-center justify-center rounded-lg border border-dark-500 bg-dark-300 text-[24px] font-bold text-primary transition-all duration-200 focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <div className="flex items-center gap-2 text-red-500 animate-scale-in">
                <AlertCircle className="h-4 w-4" />
                <p className="text-[14px]">{error}</p>
              </div>
            )}

            <Button
              onClick={handleValidate}
              disabled={otp.length !== 6 || isLoading}
              className="shad-primary-btn w-full"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
