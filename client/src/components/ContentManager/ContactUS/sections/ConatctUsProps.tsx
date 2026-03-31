import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormValues } from "../Conact-Form.types";

export type AboutUsSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  control: Control<FormValues>;
};
