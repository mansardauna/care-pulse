export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
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
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Dr. John Green",
    specialty: "General Physician",
  },
  {
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Dr. Leila Cameron",
    specialty: "Cardiologist",
  },
  {
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Dr. David Livingston",
    specialty: "Neurologist",
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Dr. Evan Peter",
    specialty: "Orthopedic Surgeon",
  },
  {
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Dr. Jane Powell",
    specialty: "Dermatologist",
  },
  {
    image: "https://randomuser.me/api/portraits/men/86.jpg",
    name: "Dr. Alex Ramirez",
    specialty: "Pediatrician",
  },
  {
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    name: "Dr. Jasmine Lee",
    specialty: "Psychiatrist",
  },
  {
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    name: "Dr. Alyana Cruz",
    specialty: "Ophthalmologist",
  },
  {
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Dr. Hardik Sharma",
    specialty: "ENT Specialist",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export type Gender = "Male" | "Female" | "Other";
export type Status = "scheduled" | "pending" | "cancelled";

export interface Appointment {
  id: string;
  patient: string;
  status: Status;
  schedule: Date;
  primaryPhysician: string;
  reason: string;
  note?: string;
  cancellationReason?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}
