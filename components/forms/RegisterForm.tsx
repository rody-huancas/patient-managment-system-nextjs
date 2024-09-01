"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl } from "@/components/ui/form";

import SubmitButton from "../SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormField";

import { User } from "@/types";
import { createUser } from "@/lib/actions/patient.actions";
import { GenderOptions } from "@/constants";
import { UserFormValidation } from "@/lib/validation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function RegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: { name: "", email: "", phone: "" },
  });

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="header">Bienvenido 👋</h1>
          <p className="text-dark-700">Háganos saber más sobre usted</p>
        </section>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Información Personal</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthdate"
            label="Fecha de Nacimiento"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Género"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between" 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {
                    GenderOptions.map(option => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-point">
                          {option}
                        </Label>
                      </div>
                    ))
                  }
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

        </div>

        <SubmitButton isLoading={isLoading}>Empezar</SubmitButton>
      </form>
    </Form>
  );
}

export default RegisterForm;
