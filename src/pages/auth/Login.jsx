
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import LandingNavbar from "../../components/layout/LandingNavbar";
import LoginIntro from "../../components/auth/LoginIntro";

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      setError("");

      const result = await login(email.trim(), password);

      if (!result?.success) {
        setError(result?.message || "Invalid email or password.");
        return;
      }

      const user = result.user;

      if (!user) {
        setError("Login succeeded, but user information was not returned.");
        return;
      }

      // User.js role values should be lowercase:
      // admin, manager, member.
      const role = user.role?.toLowerCase();

      if (role === "admin") {
        setError("Please sign in through the Admin Login page.");
        return;
      }

      if (role === "manager") {
        navigate("/manager", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to sign in. Please verify your credentials."
      );
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-[#E7E5E4] bg-white py-3 pl-10 pr-4 text-sm text-[#292524] outline-none transition placeholder:text-stone-400 focus:border-[#C2410C] focus:ring-4 focus:ring-orange-100";

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2] font-sans text-[#292524]">
      <LandingNavbar />

      <section className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="pointer-events-none absolute -left-32 top-16 -z-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

        <LoginIntro />

        <div className="relative z-10 mx-auto w-full max-w-2xl">
          <div className="mb-5 lg:hidden">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#C2410C]">
              <Sparkles size={13} />
              WELCOME BACK
            </span>
          </div>

          <div className="rounded-3xl border border-[#E7E5E5] bg-white p-5 shadow-xl shadow-stone-900/5 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C2410C]">
                Your workspace is waiting
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#292524]">
                Sign in to TeamFlow
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Use your account details to continue.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-xs font-semibold text-stone-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-xs font-semibold text-stone-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={`${inputClassName} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-400 transition-colors hover:text-[#15803D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/10 transition-colors hover:bg-[#15803D] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing you in..." : "Sign in"}
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-3 border-t border-[#E7E5E5] pt-5 text-center text-sm text-stone-500 sm:flex-row sm:justify-between">
              <p>
                New to TeamFlow?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#C2410C] hover:text-[#15803D]"
                >
                  Create an account
                </Link>
              </p>

              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#15803D]"
              >
                <ShieldCheck size={14} />
                Admin sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
