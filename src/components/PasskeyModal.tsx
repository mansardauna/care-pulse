import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldCheck } from "lucide-react";

interface PasskeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasskeyModal = ({ open, onOpenChange }: PasskeyModalProps) => {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const correctPasskey = "123456";

  useEffect(() => {
    if (!open) {
      setPasskey("");
      setError("");
    }
  }, [open]);

  const handleValidate = async () => {
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (passkey === correctPasskey) {
      localStorage.setItem("adminAccess", "true");
      onOpenChange(false);
      navigate("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-dark-500 bg-dark-300 sm:max-w-md">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-[20px] font-bold text-foreground">Admin Access Verification</DialogTitle>
          </div>
          <DialogDescription className="text-[14px] text-dark-700">
            To access the admin page, please enter the passkey (123456).
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-4">
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => {
              setPasskey(value);
              setError("");
            }}
          >
            <InputOTPGroup className="gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="flex h-14 w-14 items-center justify-center rounded-lg border-dark-500 bg-dark-400 text-[24px] font-bold text-foreground transition-all duration-200 focus:ring-1 focus:ring-primary focus:border-primary"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <div className="flex items-center gap-2 text-destructive animate-scale-in">
              <AlertCircle className="h-4 w-4" />
              <p className="text-[14px]">{error}</p>
            </div>
          )}

          <Button
            onClick={handleValidate}
            disabled={passkey.length !== 6 || isLoading}
            className="shad-primary-btn w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Verifying...
              </div>
            ) : (
              "Enter Admin Passkey"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasskeyModal;
