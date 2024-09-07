import { Gender } from "@/types";

export const GenderOptions = ["Masculino", "Femenino", "Otro"];

export const PatientFormDefaultValues = {
  firstName             : "",
  lastName              : "",
  email                 : "",
  phone                 : "",
  birthDate             : new Date(Date.now()),
  gender                : "Masculino" as Gender,
  address               : "",
  occupation            : "",
  emergencyContactName  : "",
  emergencyContactNumber: "",
  primaryPhysician      : "",
  insuranceProvider     : "",
  insurancePolicyNumber : "",
  allergies             : "",
  currentMedication     : "",
  familyMedicalHistory  : "",
  pastMedicalHistory    : "",
  identificationType    : "Partida de nacimiento",
  identificationNumber  : "",
  identificationDocument: [],
  treatmentConsent      : false,
  disclosureConsent     : false,
  privacyConsent        : false,
};

export const IdentificationTypes = [
  "Certificado de Nacimiento",
  "Licencia de Conducir",
  "Tarjeta/Póliza de Seguro Médico",
  "Tarjeta de Identificación Militar",
  "Documento Nacional de Identidad",
  "Pasaporte",
  "Tarjeta de Residente (Green Card)",
  "Tarjeta de Seguro Social",
  "Tarjeta de Identificación Estatal",
  "Tarjeta de Identificación Estudiantil",
  "Tarjeta de Votante",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending  : "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
