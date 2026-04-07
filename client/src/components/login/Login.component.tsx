import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import loginImage from "../../assets/image.png";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const BACKEND = API_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const postData = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND}/api/auth/login`, data);
      console.log("Login response", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Invalid email or password";
      setLoginError(message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login data", data);
    postData(data);
  };

  return (
    <div className="cms-auth-shell">
      <div className="cms-auth-panel">
        <section className="cms-auth-form-panel">
          <form className="cms-auth-card" onSubmit={handleSubmit(onSubmit)}>
            <section className="cms-auth-brand" aria-label="Brand panel">
              <div className="cms-auth-logo">
                <img
                  src={loginImage}
                  alt="CMS login"
                  className="h-auto w-full max-w-74 object-contain"
                />
              </div>

              <div className="cms-auth-brand-copy">
                <h1 className="cms-auth-title">Admin Portal</h1>
                <p className="cms-auth-subtitle">
                  Content management workspace for Outsource Accounting.
                </p>
              </div>
            </section>

            {loginError && (
              <div className="cms-auth-error">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{loginError}</p>
              </div>
            )}

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>
                <input
                  className="cms-auth-input"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email?.message && (
                  <p className="text-xs text-red-600">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  className="cms-auth-input"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password?.message && (
                  <p className="text-xs text-red-600">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="cms-auth-submit"
            >
              {loading && (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              )}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
