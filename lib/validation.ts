import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe contener mínimo 2 caracteres." })
    .max(50, { message: "El nombre debe contener máximo 50 caracteres." }),
  email: z.string().email("Correo electrónico incorrecto."),
  phone: z
    .string()
    .refine(
      (phone) => /^\+?\d{10,15}$/.test(phone.replace(/\s+/g, '')),
      "Número de teléfono incorrecto"
    ),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "El nombre debe contener mínimo 2 caracteres")
    .max(50, "El nombre debe contener máximo 50 caracteres"),
  email: z.string().email("Correo electrónico incorrecto"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de teléfono incorrecto"
    ),
  birthDate: z.coerce.date(),
  gender: z.enum(["Masculino", "Femenino", "Otro"]),
  address: z
    .string()
    .min(5, "La dirección debe contener al menos 5 caracteres")
    .max(500, "La dirección debe contener como máximo 500 caracteres"),
  occupation: z
    .string()
    .min(2, "La ocupación debe contener mínimo 2 caracteres")
    .max(500, "La ocupación debe contener máximo 500 caracteres"),
  emergencyContactName: z
    .string()
    .min(2, "El nombre del contacto de emergencia debe contener mínimo 2 caracteres")
    .max(50, "El nombre del contacto de emergencia debe contener máximo 50 caracteres"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+?\d{10,15}$/.test(emergencyContactNumber.replace(/\s+/g, '')),
      "Número de teléfono del contacto de emergencia incorrecto"
    ),
  primaryPhysician: z.string().min(2, "Debe seleccionar al menos un médico"),
  insuranceProvider: z
    .string()
    .min(2, "El nombre de la aseguradora debe contener mínimo 2 caracteres")
    .max(50, "El nombre de la aseguradora debe contener máximo 50 caracteres"),
  insurancePolicyNumber: z
    .string()
    .min(2, "El número de póliza debe contener mínimo 2 caracteres")
    .max(50, "El número de póliza debe contener máximo 50 caracteres"),
  allergies: z.string().optional(),
  currentMedication     : z.string().optional(),
  familyMedicalHistory  : z.string().optional(),
  pastMedicalHistory    : z.string().optional(),
  identificationType    : z.string().optional(),
  identificationNumber  : z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent      : z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debe aceptar el consentimiento de tratamiento para proceder",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debe aceptar el consentimiento de divulgación para proceder",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debe aceptar el consentimiento de privacidad para proceder",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician  : z.string().min(2, "Debe seleccionar al menos un médico"),
  schedule          : z.coerce.date(),
  reason            : z
    .string()
    .min(2, "La razón debe contener mínimo 2 caracteres")
    .max(500, "La razón debe contener máximo 500 caracteres"),
  note              : z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician  : z.string().min(2, "Debe seleccionar al menos un médico"),
  schedule          : z.coerce.date(),
  reason            : z.string().optional(),
  note              : z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician  : z.string().min(2, "Debe seleccionar al menos un médico"),
  schedule          : z.coerce.date(),
  reason            : z.string().optional(),
  note              : z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "La razón debe contener mínimo 2 caracteres")
    .max(500, "La razón debe contener máximo 500 caracteres"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
