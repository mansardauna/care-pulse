import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OTPModal from "@/components/OTPModal";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
});

type FormValues = z.infer<typeof formSchema>;

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [patientId, setPatientId] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Generate a random patient ID
    const newPatientId = Math.random().toString(36).substring(7);
    localStorage.setItem("patientData", JSON.stringify({ ...values, id: newPatientId }));
    setPatientId(newPatientId);
    setIsLoading(false);
    setShowOTP(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Full Name</FormLabel>
                <FormControl>
                  <div className="relative flex items-center rounded-md border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <User className="ml-4 h-5 w-5 text-dark-600" />
                    <Input
                      placeholder="John Doe"
                      className="shad-input border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-[12px] mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Email</FormLabel>
                <FormControl>
                  <div className="relative flex items-center rounded-md border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <Mail className="ml-4 h-5 w-5 text-dark-600" />
                    <Input
                      placeholder="johndoe@mail.com"
                      type="email"
                      className="shad-input border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-[12px] mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Phone Number</FormLabel>
                <FormControl>
                  <FormControl>
                  <div className="relative flex items-center rounded-md border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <Phone className="ml-4 h-5 w-5 text-dark-600" />
                    <Input
                    placeholder="(555) 000-0000"
                      type="phone"
                                          value={field.value}
                    onChange={field.onChange}
                      className="shad-input border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </div>
                </FormControl>
                  
                </FormControl>
                <FormMessage className="text-red-500 text-[12px] mt-1" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="shad-primary-btn mt-8 w-full text-[14px] font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Loading...
              </div>
            ) : (
              "Get Started"
            )}
          </Button>
        </form>
      </Form>

      <OTPModal 
        open={showOTP} 
        onOpenChange={setShowOTP} 
        patientId={patientId}
      />
    </>
  );
};

export default PatientForm;
