import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormValues } from "../Faq.types";

export type FaqSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
};
