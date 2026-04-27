import type { FieldErrors, FieldValues } from "react-hook-form";

type RhfFieldErrorProps<TFieldValues extends FieldValues> = {
  errors?: FieldErrors<TFieldValues>;
  path: string;
  className?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getValueAtPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((current, segment) => {
    if (!isRecord(current)) {
      return undefined;
    }

    return current[segment];
  }, source);
}

const RhfFieldError = <TFieldValues extends FieldValues>({
  errors,
  path,
  className = "mt-1 text-xs text-red-600",
}: RhfFieldErrorProps<TFieldValues>) => {
  if (!errors) {
    return null;
  }

  const errorNode = getValueAtPath(errors, path);

  if (!isRecord(errorNode)) {
    return null;
  }

  const message = errorNode.message;

  if (typeof message !== "string" || message.trim().length === 0) {
    return null;
  }

  return <p className={className}>{message}</p>;
};

export default RhfFieldError;
