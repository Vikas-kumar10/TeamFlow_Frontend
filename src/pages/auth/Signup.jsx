
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import LandingNavbar from "../../components/layout/LandingNavbar";
import SignupIntro from "../../components/auth/SignupIntro";

export const Signup = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setError("");

      const result = await signup({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (result?.success) {
        navigate("/login", { replace: true });
      } else {
        setError(
          result?.message || "Failed to create account. Please try again."
        );
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    }
  };

  const fieldClassName =
    "w-full rounded-xl border border-[#E7E5E4] bg-white py-3 pl-10 pr-4 text-sm text-[#292524] outline-none transition placeholder:text-stone-400 focus:border-[#C2410C] focus:ring-4 focus:ring-orange-100";

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2] font-sans text-[#292524]">
      <LandingNavbar />

      <section className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="pointer-events-none absolute -left-32 top-16 -z-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

        <SignupIntro />

        <div className="relative z-10 mx-auto w-full max-w-2xl">
          <div className="mb-5 lg:hidden">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#C2410C]">
              <Sparkles size={13} />
              GET STARTED WITH TEAMFLOW
            </span>
          </div>

          <div className="rounded-3xl border border-[#E7E5E4] bg-white p-5 shadow-xl shadow-stone-900/5 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C2410C]">
                Create an account
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#292524]">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Sign up to create a workspace, organize projects, and
                collaborate with your team.
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
                  htmlFor="signup-name"
                  className="mb-2 block text-xs font-semibold text-stone-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="e.g. Jordan Lee"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-xs font-semibold text-stone-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-xs font-semibold text-stone-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={`${fieldClassName} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-400 transition-colors hover:text-[#15803D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-200"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
                <p className="text-sm font-semibold text-[#292524]">
                  Ready to work together?
                </p>
                <p className="mt-1 text-xs leading-5 text-stone-600">
                  Your workspace permissions will be assigned when you create
                  or join a workspace.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/10 transition-colors hover:bg-[#9A3412] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating your account…" : "Create account"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#C2410C] underline-offset-4 hover:text-[#15803D] hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
