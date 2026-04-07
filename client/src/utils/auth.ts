export type AuthRole = "admin" | "user";

export type StoredAuthUser = {
  id: string;
  email: string;
  role: AuthRole;
};

const RESERVED_ADMIN_EMAIL = "admin@gmail.com";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const normalizeRole = (role: unknown): AuthRole =>
  typeof role === "string" && role.trim().toLowerCase() === "admin"
    ? "admin"
    : "user";

export const getAuthToken = (): string | null => localStorage.getItem("token");

export const getCurrentUser = (): StoredAuthUser | null => {
  const rawUser = localStorage.getItem("user");
  if (!rawUser) {
    return null;
  }

  try {
    const parsedUser: unknown = JSON.parse(rawUser);
    if (!isRecord(parsedUser)) {
      return null;
    }

    const id = typeof parsedUser.id === "string" ? parsedUser.id : "";
    const email = typeof parsedUser.email === "string" ? parsedUser.email : "";
    const normalizedEmail = email.trim().toLowerCase();

    if (!id || !email) {
      return null;
    }

    const role =
      normalizeRole(parsedUser.role) === "admin" ||
      normalizedEmail === RESERVED_ADMIN_EMAIL
        ? "admin"
        : "user";

    return {
      id,
      email,
      role,
    };
  } catch {
    return null;
  }
};

export const getCurrentUserRole = (): AuthRole =>
  getCurrentUser()?.role ?? "user";

export const isAuthenticated = (): boolean => Boolean(getAuthToken());

export const isCurrentUserAdmin = (): boolean =>
  isAuthenticated() && getCurrentUserRole() === "admin";
