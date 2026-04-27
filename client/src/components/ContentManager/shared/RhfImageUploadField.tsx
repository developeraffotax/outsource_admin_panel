import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import ImagePreview from "./ImagePreview";
import RhfFieldError from "./RhfFieldError";

type RhfImageUploadFieldProps<TFieldValues extends FieldValues> = {
  id: string;
  label: string;
  path: string;
  register: UseFormRegister<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  previewValue?: unknown;
  previewAlt?: string;
  previewClassName?: string;
  allowFileListPreview?: boolean;
  labelClassName?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
};

const RhfImageUploadField = <TFieldValues extends FieldValues>({
  id,
  label,
  path,
  register,
  errors,
  previewValue,
  previewAlt = "Current image",
  previewClassName,
  allowFileListPreview = false,
  labelClassName = "mb-1 block text-sm font-medium text-slate-700",
  inputClassName = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm",
  containerClassName,
  errorClassName,
}: RhfImageUploadFieldProps<TFieldValues>) => {
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        className={inputClassName}
        {...register(path as Path<TFieldValues>)}
      />
      <ImagePreview
        value={previewValue}
        alt={previewAlt}
        className={previewClassName}
        allowFileList={allowFileListPreview}
      />
      <RhfFieldError errors={errors} path={path} className={errorClassName} />
    </div>
  );
};

export default RhfImageUploadField;
