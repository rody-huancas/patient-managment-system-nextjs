"use client";

import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";

import SubmitButton from "../SubmitButton";
import CustomFormField from "../CustomFormField";

import { UserFormValidation } from "@/lib/validation";

export enum FormFieldType {
  INPUT       = "input",
  TEXTAREA    = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX    = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT      = "select",
  SKELETON    = "skeleton"
}

export function PatientForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  });

  function onSubmit(values: z.infer<typeof UserFormValidation>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hola 👋</h1>
          <p className="text-dark-700">Programa tu primera cita</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nombre Completo"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Número de Celular"
          placeholder="(+51) 907 135 664"
        />

        <SubmitButton isLoading={isLoading}>
          Empezar
        </SubmitButton>
      </form>
    </Form>
  );
}

export default PatientForm;
