import axios from "axios";

export const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | { error?: unknown }
      | undefined;

    if (typeof responseData?.error === "string") {
      return responseData.error;
    }

    if (Array.isArray(responseData?.error)) {
      const firstIssue = responseData.error[0] as
        | { message?: unknown }
        | undefined;
      if (typeof firstIssue?.message === "string") {
        return firstIssue.message;
      }
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
