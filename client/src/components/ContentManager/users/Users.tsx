import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { API_BASE_URL } from "../../../config/api";
import {
  getAuthToken,
  getCurrentUser,
  normalizeRole,
} from "../../../utils/auth";

type ManagedUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

type CreateUserForm = {
  email: string;
  password: string;
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
};

const BACKEND = API_BASE_URL;

const normalizeManagedUser = (user: {
  id?: unknown;
  email?: unknown;
  role?: unknown;
}): ManagedUser => ({
  id: typeof user.id === "string" ? user.id : "",
  email: typeof user.email === "string" ? user.email : "",
  role: normalizeRole(user.role),
});

const sortUsersByEmail = (users: ManagedUser[]): ManagedUser[] =>
  [...users].sort((a, b) => a.email.localeCompare(b.email));

const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | {
          error?: unknown;
        }
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

const Users = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const currentUser = useMemo(() => getCurrentUser(), []);
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [passwordDrafts, setPasswordDrafts] = useState<Record<string, string>>(
    {},
  );
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );
  const [savingPasswordById, setSavingPasswordById] = useState<
    Record<string, boolean>
  >({});
  const [deletingById, setDeletingById] = useState<Record<string, boolean>>({});

  const getAuthConfig = useCallback(() => {
    const token = getAuthToken();
    if (!token) {
      return null;
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, []);

  const loadUsers = useCallback(async () => {
    const config = getAuthConfig();
    if (!config) {
      setLoading(false);
      setFeedback({
        type: "error",
        message: "Missing session token. Please sign in again.",
      });
      return;
    }

    try {
      const response = await axios.get<{ users?: unknown[] }>(
        `${BACKEND}/api/auth/users`,
        config,
      );

      const normalizedUsers = Array.isArray(response.data.users)
        ? response.data.users
            .map((user) =>
              normalizeManagedUser(
                (user ?? {}) as {
                  id?: unknown;
                  email?: unknown;
                  role?: unknown;
                },
              ),
            )
            .filter((user) => user.id && user.email)
        : [];

      setUsers(sortUsersByEmail(normalizedUsers));
    } catch (error: unknown) {
      setFeedback({
        type: "error",
        message: extractErrorMessage(error, "Failed to load users."),
      });
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onCreateUser: SubmitHandler<CreateUserForm> = async (data) => {
    const config = getAuthConfig();
    if (!config) {
      setFeedback({
        type: "error",
        message: "Missing session token. Please sign in again.",
      });
      return;
    }

    setAdding(true);
    setFeedback(null);

    try {
      const response = await axios.post<{ user?: unknown }>(
        `${BACKEND}/api/auth/users`,
        data,
        config,
      );

      const createdUser = normalizeManagedUser(
        (response.data.user ?? {}) as {
          id?: unknown;
          email?: unknown;
          role?: unknown;
        },
      );

      if (!createdUser.id || !createdUser.email) {
        throw new Error("Invalid user response from server");
      }

      setUsers((currentUsers) =>
        sortUsersByEmail([
          ...currentUsers.filter((user) => user.id !== createdUser.id),
          createdUser,
        ]),
      );
      reset();
      setFeedback({
        type: "success",
        message: "User created successfully with role user.",
      });
    } catch (error: unknown) {
      setFeedback({
        type: "error",
        message: extractErrorMessage(error, "Failed to create user."),
      });
    } finally {
      setAdding(false);
    }
  };

  const updatePasswordDraft = (userId: string, value: string) => {
    setPasswordDrafts((current) => ({
      ...current,
      [userId]: value,
    }));
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords((current) => ({
      ...current,
      [userId]: !current[userId],
    }));
  };

  const savePassword = async (userId: string) => {
    const draftPassword = (passwordDrafts[userId] ?? "").trim();
    if (draftPassword.length < 8) {
      setFeedback({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return;
    }

    const config = getAuthConfig();
    if (!config) {
      setFeedback({
        type: "error",
        message: "Missing session token. Please sign in again.",
      });
      return;
    }

    setSavingPasswordById((current) => ({ ...current, [userId]: true }));
    setFeedback(null);

    try {
      await axios.patch(
        `${BACKEND}/api/auth/users/${userId}/password`,
        { password: draftPassword },
        config,
      );

      setPasswordDrafts((current) => ({ ...current, [userId]: "" }));
      setFeedback({
        type: "success",
        message: "Password updated successfully.",
      });
    } catch (error: unknown) {
      setFeedback({
        type: "error",
        message: extractErrorMessage(error, "Failed to update password."),
      });
    } finally {
      setSavingPasswordById((current) => ({ ...current, [userId]: false }));
    }
  };

  const deleteUser = async (user: ManagedUser) => {
    if (currentUser?.id === user.id) {
      setFeedback({
        type: "error",
        message: "You cannot delete your own account.",
      });
      return;
    }

    const shouldDelete = window.confirm(`Delete ${user.email}?`);
    if (!shouldDelete) {
      return;
    }

    const config = getAuthConfig();
    if (!config) {
      setFeedback({
        type: "error",
        message: "Missing session token. Please sign in again.",
      });
      return;
    }

    setDeletingById((current) => ({ ...current, [user.id]: true }));
    setFeedback(null);

    try {
      await axios.delete(`${BACKEND}/api/auth/users/${user.id}`, config);
      setUsers((currentUsers) =>
        currentUsers.filter((existingUser) => existingUser.id !== user.id),
      );
      setFeedback({ type: "success", message: "User deleted successfully." });
    } catch (error: unknown) {
      setFeedback({
        type: "error",
        message: extractErrorMessage(error, "Failed to delete user."),
      });
    } finally {
      setDeletingById((current) => ({ ...current, [user.id]: false }));
    }
  };

  return (
    <div className="cms-form-shell mx-auto w-full max-w-5xl">
      <div className="cms-page-header">
        <h1 className="cms-page-title">Users</h1>
        <p className="cms-page-subtitle">
          Add users, reset user passwords, and delete accounts. New users are
          always created with the user role.
        </p>
      </div>

      {feedback && (
        <div
          className={`mb-4 rounded-xl border px-4 py-3 text-sm font-semibold ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600">
          Add New User
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Role is fixed to user and cannot be changed from this page.
        </p>

        <form
          className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-start"
          onSubmit={handleSubmit(onCreateUser)}
        >
          <div>
            <label
              className="mb-1 block text-sm text-slate-600"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="new.user@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email?.message && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1 block text-sm text-slate-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password?.message && (
              <p className="mt-1 text-xs font-semibold text-rose-600">
                {String(errors.password.message)}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="cms-btn-primary h-10.5"
            disabled={adding}
          >
            {adding ? "Adding..." : "Add user"}
          </button>
        </form>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-slate-600">
            Existing Users
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {users.length} total
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-sm text-slate-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-225 border-collapse text-sm">
              <thead className="bg-slate-100/80 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Role</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Password
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white">
                {users.map((user) => {
                  const isCurrentUser = currentUser?.id === user.id;
                  const isSavingPassword = Boolean(savingPasswordById[user.id]);
                  const isDeleting = Boolean(deletingById[user.id]);

                  return (
                    <tr key={user.id} className="align-top">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-800">
                          {user.email}
                        </p>
                        {isCurrentUser && (
                          <p className="mt-1 text-xs text-slate-500">
                            Current account
                          </p>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
                          <input
                            type={showPasswords[user.id] ? "text" : "password"}
                            value={passwordDrafts[user.id] ?? ""}
                            onChange={(event) =>
                              updatePasswordDraft(user.id, event.target.value)
                            }
                            placeholder="Enter a new password"
                            className="min-w-60"
                          />

                          <button
                            type="button"
                            className="cms-btn-secondary"
                            onClick={() => togglePasswordVisibility(user.id)}
                          >
                            {showPasswords[user.id] ? "Hide" : "View"}
                          </button>

                          <button
                            type="button"
                            className="cms-btn-primary"
                            onClick={() => savePassword(user.id)}
                            disabled={isSavingPassword}
                          >
                            {isSavingPassword ? "Saving..." : "Update password"}
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={() => deleteUser(user)}
                          disabled={isDeleting || isCurrentUser}
                        >
                          {isDeleting ? "Deleting..." : "Delete user"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Users;
