import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldPath,
  RegisterOptions,
} from "react-hook-form";
import RhfFieldError from "./RhfFieldError";

type RhfTextInputProps<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  path: string;
  register: UseFormRegister<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  registerOptions?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
  type?: "text" | "email" | "number" | "url" | "tel" | "password";
};

const RhfTextInput = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  path,
  register,
  errors,
  className = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base font-semibold text-slate-900",
  labelClassName = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600",
  errorClassName,
  registerOptions,
  type = "text",
}: RhfTextInputProps<TFieldValues>) => {
  return (
    <div>
      {label && <label className={labelClassName}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        {...register(path as FieldPath<TFieldValues>, registerOptions)}
      />
      <RhfFieldError errors={errors} path={path} className={errorClassName} />
    </div>
  );
};

export default RhfTextInput;
