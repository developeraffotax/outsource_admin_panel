const backendFromEnv =
  (import.meta.env.VITE_BACKEND_URL as string | undefined) ??
  // VITE_Backend_URL is a legacy fallback for a past casing mistake in .env — keep until all envs are updated
  (import.meta.env.VITE_Backend_URL as string | undefined) ??
  "";

export const API_BASE_URL = backendFromEnv.trim().replace(/\/+$/, "");
