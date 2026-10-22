import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  KeyRound,
  Layers,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const AdminLogin = () => {
  const { login, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your admin email and password.");
      return;
    }

    setError("");
    try {
      const result = await login(email, password);
      if (result.user?.role !== "Admin") {
        logout();
        setError(
          "This sign-in is for Admin accounts only. Check your admin credentials.",
        );
        return;
      }
      navigate("/admin", { replace: true });
    } catch {
      logout();
      setError("Unable to sign in. Check your credentials and try again.");
    }
  };

  const useDemoAdmin = () => {
    setEmail("admin@teamflow.app");
    setPassword("password123");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 text-white shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
            TeamFlow Admin
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Administrator access to your workspace
          </p>
        </div>

        <section className="mt-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">Admin sign in</h2>
            <p className="mt-1 text-xs text-slate-500">
              Use an account with the Admin role.
            </p>
          </div>
          {error && (
            <div
              role="alert"
              className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="block mb-1.5 text-xs font-semibold text-slate-700">
                Admin email
              </span>
              <span className="relative block">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@company.com"
                  className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                />
              </span>
            </label>
            <label className="block">
              <span className="block mb-1.5 text-xs font-semibold text-slate-700">
                Password
              </span>
              <span className="relative block">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                />
              </span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-bold flex justify-center items-center gap-2"
            >
              <span>{loading ? "Verifying…" : "Sign in as Admin"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-5 p-3 rounded-xl bg-violet-50 border border-violet-100">
            <div className="flex items-start gap-2">
              <KeyRound className="w-4 h-4 mt-0.5 text-violet-600" />
              <div className="text-xs text-violet-900">
                <p className="font-semibold">Demo admin account</p>
                <p className="mt-1">admin@teamflow.app · password123</p>
                <button
                  type="button"
                  onClick={useDemoAdmin}
                  className="mt-2 font-semibold underline underline-offset-2"
                >
                  Fill demo credentials
                </button>
              </div>
            </div>
          </div>
          <Link
            to="/login"
            className="mt-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Member / Manager login
          </Link>
        </section>
        <p className="mt-4 text-center text-[11px] text-slate-400">
          <Layers className="inline w-3 h-3 mr-1" />
          TeamFlow workspace access
        </p>
      </div>
    </main>
  );
};
