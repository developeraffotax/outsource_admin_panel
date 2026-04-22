import type { FieldErrors } from "react-hook-form";
import type { ServicesForm } from "./ServicesProps";

type FieldErrorProps = {
  errors: FieldErrors<ServicesForm>;
  path: string;
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

const FormFieldError = ({ errors, path }: FieldErrorProps) => {
  const errorNode = getValueAtPath(errors, path);

  if (!isRecord(errorNode)) {
    return null;
  }

  const message = errorNode.message;

  if (typeof message !== "string" || message.trim().length === 0) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-600">{message}</p>;
};

export default FormFieldError;
