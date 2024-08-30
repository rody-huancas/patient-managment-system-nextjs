"use client";

import Image from "next/image";
import { Control } from "react-hook-form";

import PhoneInput, { type Value }  from 'react-phone-number-input'

import { Input } from "./ui/input";
import { FormFieldType } from "./forms/PatientForm";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";

import 'react-phone-number-input/style.css'

interface CustomProps {
  control        : Control<any>;
  fieldType      : FormFieldType,
  name           : string;
  label?         : string;
  placeholder?   : string;
  iconSrc?       : string;
  iconAlt?       : string;
  disabled?      : boolean;
  dateFormat?    : string;
  showTimeSelect?: boolean;
  children?      : React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image 
              src={iconSrc!}
              width={24}
              height={24}
              alt={iconAlt || 'icon'}
              className="ml-4"
            />
          )}
          <FormControl>
            <Input 
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="PE"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as Value | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )

    default:
      break;
  }
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, placeholder, iconSrc, iconAlt } = props;

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          {
            fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel htmlFor={name}>{label}</FormLabel>
            )
          }

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
