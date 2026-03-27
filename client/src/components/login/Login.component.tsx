import { useForm, type SubmitHandler } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login data", data);
    // TODO: Implement login logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">Login</h2>
          <p className="mt-1 text-sm text-slate-600">
            Sign in to continue to your dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 transition focus:border-slate-400"
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-600">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-0 transition focus:border-slate-400"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password?.message && (
              <p className="text-sm text-red-600">
                {String(errors.password.message)}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full cursor-pointer rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
