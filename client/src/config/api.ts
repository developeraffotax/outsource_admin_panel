const backendFromEnv =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ??
  (import.meta.env.VITE_Backend_URL as string | undefined) ??
  "";

export const API_BASE_URL = backendFromEnv.trim().replace(/\/+$/, "");
