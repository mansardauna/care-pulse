import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, Mail, Calendar, Briefcase, MapPin, FileText, Shield } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Doctors, GenderOptions, IdentificationTypes } from "@/lib/constants";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  birthDate: z.string().min(1, "Birth date is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string().min(5, "Address is required"),
  occupation: z.string().min(2, "Occupation is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactNumber: z.string().min(10, "Invalid phone number"),
  primaryPhysician: z.string().min(1, "Please select a physician"),
  insuranceProvider: z.string().min(2, "Insurance provider is required"),
  insurancePolicyNumber: z.string().min(2, "Policy number is required"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().min(1, "Identification type is required"),
  identificationNumber: z.string().min(2, "Identification number is required"),
  treatmentConsent: z.boolean().refine((val) => val === true, "You must consent to treatment"),
  disclosureConsent: z.boolean().refine((val) => val === true, "You must consent to disclosure"),
  privacyConsent: z.boolean().refine((val) => val === true, "You must accept privacy policy"),
});

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const patientData = JSON.parse(localStorage.getItem("patientData") || "{}");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: patientData.name?.split(" ")[0] || "",
      lastName: patientData.name?.split(" ")[1] || "",
      email: patientData.email || "",
      phone: patientData.phone || "",
      birthDate: "",
      gender: "Male",
      address: "",
      occupation: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      primaryPhysician: "",
      insuranceProvider: "",
      insurancePolicyNumber: "",
      allergies: "",
      currentMedication: "",
      familyMedicalHistory: "",
      pastMedicalHistory: "",
      identificationType: "",
      identificationNumber: "",
      treatmentConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem("registeredPatient", JSON.stringify({ ...values, id: userId }));
    navigate(`/patients/${userId}/new-appointment`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        {/* Personal Information Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-[18px] font-bold text-foreground">Personal Information</h2>
          </div>

          {/* Full Name Row */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Full Name</FormLabel>
                <FormControl>
                  <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <User className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                    <Input placeholder="ex: John" className="shad-input border-0 focus-visible:ring-0" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Email Address</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <Mail className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input placeholder="johndoe@example.com" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
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
                    <PhoneInput
                      defaultCountry="US"
                      placeholder="+1 (555) 000-0000"
                      international
                      withCountryCallingCode
                      value={field.value}
                      onChange={field.onChange}
                      className="input-phone"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Date of Birth</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <Calendar className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input type="date" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex h-11 gap-6 xl:justify-between"
                    >
                      {GenderOptions.map((option) => (
                        <div key={option} className="radio-group flex items-center gap-2 rounded-lg border border-dark-500 bg-dark-400 px-4 transition-all duration-200 hover:border-primary/50">
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="border-dark-500 text-primary h-4 w-4"
                          />
                          <Label htmlFor={option} className="text-dark-700 text-[14px] cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Address</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <MapPin className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input placeholder="14 street, New York, NY - 5101" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Occupation</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <Briefcase className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input placeholder="Software Engineer" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Emergency Contact Name</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <User className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input placeholder="Guardian's name" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContactNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Emergency Contact Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="US"
                      placeholder="+1 (555) 000-0000"
                      international
                      withCountryCallingCode
                      value={field.value}
                      onChange={field.onChange}
                      className="input-phone"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Medical Information Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-[18px] font-bold text-foreground">Medical Information</h2>
          </div>

          <FormField
            control={form.control}
            name="primaryPhysician"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Primary Care Physician</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder="Select a physician" />
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
              name="insuranceProvider"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Insurance Provider</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <Shield className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input placeholder="BlueCross BlueShield" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="insurancePolicyNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Insurance Policy Number</FormLabel>
                  <FormControl>
                    <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                      <FileText className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                      <Input placeholder="ABC123456789" className="shad-input border-0 focus-visible:ring-0" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Allergies (if any)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Peanuts, Penicillin, Pollen"
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
              name="currentMedication"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Current Medications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ibuprofen 200mg, Levothyroxine 50mcg"
                      className="shad-textarea"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <FormField
              control={form.control}
              name="familyMedicalHistory"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Family Medical History (if relevant)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mother had brain cancer, Father has heart disease"
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
              name="pastMedicalHistory"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-dark-700 text-[14px]">Past Medical History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
                      className="shad-textarea"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-[12px]" />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Identification Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-[18px] font-bold text-foreground">Identification and Verification</h2>
          </div>

          <FormField
            control={form.control}
            name="identificationType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Identification Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="shad-select-trigger">
                      <SelectValue placeholder="Select identification type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-select-content">
                    {IdentificationTypes.map((type) => (
                      <SelectItem key={type} value={type} className="cursor-pointer hover:bg-dark-400">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="identificationNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-dark-700 text-[14px]">Identification Number</FormLabel>
                <FormControl>
                  <div className="flex rounded-lg border border-dark-500 bg-dark-400 transition-all duration-200 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
                    <FileText className="ml-4 mt-3 h-5 w-5 text-dark-600" />
                    <Input placeholder="123456789" className="shad-input border-0 focus-visible:ring-0" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-[12px]" />
              </FormItem>
            )}
          />
        </section>

        {/* Consent Section */}
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header text-[18px] font-bold text-foreground">Consent and Privacy</h2>
          </div>

          <FormField
            control={form.control}
            name="treatmentConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-dark-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-dark-700 text-[14px] font-normal cursor-pointer">
                    I consent to receive treatment for my health condition.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="disclosureConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-dark-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-dark-700 text-[14px] font-normal cursor-pointer">
                    I consent to the use and disclosure of my health information for treatment purposes.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="privacyConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-dark-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-dark-700 text-[14px] font-normal cursor-pointer">
                    I acknowledge that I have reviewed and agree to the privacy policy.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </section>

        <Button type="submit" className="shad-primary-btn w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Submitting...
            </div>
          ) : (
            "Submit and Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
