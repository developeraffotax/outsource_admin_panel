import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";
import RhfFieldError from "./RhfFieldError";

type RhfTextareaProps<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  path: string;
  register: UseFormRegister<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  rows?: number;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const RhfTextarea = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  path,
  register,
  errors,
  rows = 3,
  className = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700",
  labelClassName = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600",
  errorClassName,
}: RhfTextareaProps<TFieldValues>) => {
  return (
    <div>
      {label && <label className={labelClassName}>{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={className}
        {...register(path as FieldPath<TFieldValues>)}
      />
      <RhfFieldError errors={errors} path={path} className={errorClassName} />
    </div>
  );
};

export default RhfTextarea;
