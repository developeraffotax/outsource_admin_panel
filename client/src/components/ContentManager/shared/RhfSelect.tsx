import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  FieldPath,
} from "react-hook-form";
import RhfFieldError from "./RhfFieldError";

type SelectOption = {
  label: string;
  value: string | number;
};

type RhfSelectProps<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  path: string;
  register: UseFormRegister<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  options: SelectOption[];
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const RhfSelect = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  path,
  register,
  errors,
  options,
  className = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900",
  labelClassName = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600",
  errorClassName,
}: RhfSelectProps<TFieldValues>) => {
  return (
    <div>
      {label && <label className={labelClassName}>{label}</label>}
      <select
        className={className}
        {...register(path as FieldPath<TFieldValues>)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <RhfFieldError errors={errors} path={path} className={errorClassName} />
    </div>
  );
};

export default RhfSelect;
