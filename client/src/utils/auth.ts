export type AuthRole = "admin" | "user";

export type StoredAuthUser = {
  id: string;
  email: string;
  role: AuthRole;
};

const RESERVED_ADMIN_EMAIL = "admin@gmail.com";
const AUTH_TOKEN_STORAGE_KEY = "token";
const AUTH_USER_STORAGE_KEY = "user";

type JwtPayload = {
  exp?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const normalizeRole = (role: unknown): AuthRole =>
  typeof role === "string" && role.trim().toLowerCase() === "admin"
    ? "admin"
    : "user";

const decodeBase64Url = (value: string): string | null => {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const remainder = normalized.length % 4;
    const padded =
      remainder === 0
        ? normalized
        : `${normalized}${"=".repeat(4 - remainder)}`;

    return atob(padded);
  } catch {
    return null;
  }
};

const getJwtPayload = (token: string): JwtPayload | null => {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    return null;
  }

  const decodedPayload = decodeBase64Url(tokenParts[1]);
  if (!decodedPayload) {
    return null;
  }

  try {
    const parsedPayload: unknown = JSON.parse(decodedPayload);
    return isRecord(parsedPayload) ? (parsedPayload as JwtPayload) : null;
  } catch {
    return null;
  }
};

const hasValidTokenExpiry = (token: string): boolean => {
  const payload = getJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") {
    return false;
  }

  return payload.exp * 1000 > Date.now();
};

export const clearAuthSession = (): void => {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
};

export const getAuthToken = (): string | null =>
  localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const getCurrentUser = (): StoredAuthUser | null => {
  const rawUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);
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

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const user = getCurrentUser();

  if (!token || !user || !hasValidTokenExpiry(token)) {
    clearAuthSession();
    return false;
  }

  return true;
};

export const isCurrentUserAdmin = (): boolean =>
  isAuthenticated() && getCurrentUserRole() === "admin";

export const buildAuthConfig = (): {
  headers: { Authorization: string };
} | null => {
  const token = getAuthToken();
  if (!token || !hasValidTokenExpiry(token)) {
    clearAuthSession();
    return null;
  }

  return { headers: { Authorization: `Bearer ${token}` } };
};
