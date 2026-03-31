import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormValues } from "../Services.type";

// Wrapper because FormValues is a root array — react-hook-form needs an object
export type ServicesForm = { services: FormValues };

export type ServiceSectionProps = {
  index: number;
  register: UseFormRegister<ServicesForm>;
  errors: FieldErrors<ServicesForm>;
  control: Control<ServicesForm>;
};
