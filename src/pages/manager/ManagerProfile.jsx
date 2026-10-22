import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const profileFields = [
  {
    key: "name",
    label: "Full name",
    icon: User,
    autoComplete: "name",
    required: true,
  },
  {
    key: "email",
    label: "Email address",
    icon: Mail,
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    key: "title",
    label: "Job title",
    icon: Briefcase,
    autoComplete: "organization-title",
  },
  { key: "department", label: "Department", autoComplete: "organization" },
  {
    key: "location",
    label: "Location",
    icon: MapPin,
    autoComplete: "address-level2",
  },
  {
    key: "phone",
    label: "Phone",
    icon: Phone,
    type: "tel",
    autoComplete: "tel",
  },
];

const defaultPreferences = {
  overdueAlerts: true,
  taskSubmissions: true,
  memberComments: true,
  dailyTeamDigest: true,
};

const notificationPreferences = [
  {
    id: "overdueAlerts",
    title: "Overdue task alerts",
    description: "Get notified when a team task passes its deadline.",
  },
  {
    id: "taskSubmissions",
    title: "Review submissions",
    description: 'Get notified when a task moves to "In Review".',
  },
  {
    id: "memberComments",
    title: "Comments and discussions",
    description: "Get notified about comments on managed tasks.",
  },
  {
    id: "dailyTeamDigest",
    title: "Daily team summary",
    description: "Receive a daily summary of team progress and completed work.",
  },
];

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const ProfileField = ({ field, value, onChange }) => {
  const Icon = field.icon;
  const inputId = `manager-profile-${field.key}`;
  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700"
      >
        {Icon && (
          <Icon className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        )}
        {field.label}
      </label>
      <input
        id={inputId}
        name={field.key}
        type={field.type || "text"}
        autoComplete={field.autoComplete}
        required={field.required}
        value={value}
        onChange={onChange}
        className={fieldClass}
      />
    </div>
  );
};

export const ManagerProfile = () => {
  const { user, updateProfile } = useAuth();
  const formData = useMemo(
    () => ({
      name: user?.name || "",
      email: user?.email || "",
      title: user?.title || "",
      department: user?.department || "",
      location: user?.location || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
    }),
    [user],
  );
  const [values, setValues] = useState(formData);
  const [notificationPrefs, setNotificationPrefs] = useState({
    ...defaultPreferences,
    ...user?.notificationPrefs,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setValues(formData);
    setNotificationPrefs({ ...defaultPreferences, ...user?.notificationPrefs });
  }, [formData, user?.notificationPrefs]);

  useEffect(() => {
    if (!savedSuccess) return undefined;
    const timeoutId = window.setTimeout(() => setSavedSuccess(false), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [savedSuccess]);

  const initials =
    values.name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TF";

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile({ ...values, notificationPrefs });
    setSavedSuccess(true);
  };

  return (
    <main className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
          Account
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
          Manager profile &amp; settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your profile details, workspace role, and team alerts.
        </p>
      </header>

      {savedSuccess && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800"
        >
          <CheckCircle2
            className="h-4 w-4 text-emerald-700"
            aria-hidden="true"
          />
          Your profile and notification preferences have been saved.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <section
          className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6"
          aria-labelledby="manager-profile-heading"
        >
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt=""
                className="h-14 w-14 rounded-2xl object-cover ring-4 ring-blue-50"
              />
            ) : (
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-base font-bold text-blue-700"
                aria-hidden="true"
              >
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <h2
                id="manager-profile-heading"
                className="truncate text-base font-bold text-slate-900"
              >
                {values.name || "Your profile"}
              </h2>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {values.title || "Manager"}
              </p>
            </div>
            <span className="ml-auto rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
              {user?.role || "Manager"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {profileFields.map((field) => (
              <ProfileField
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
              />
            ))}
          </div>
          <div>
            <label
              htmlFor="manager-profile-bio"
              className="mb-1.5 block text-xs font-semibold text-slate-700"
            >
              About me
            </label>
            <textarea
              id="manager-profile-bio"
              name="bio"
              rows={4}
              value={values.bio}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  bio: event.target.value,
                }))
              }
              placeholder="Share a little about your role"
              className={`${fieldClass} resize-y`}
            />
          </div>
        </section>

        <section
          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6"
          aria-labelledby="manager-preferences-heading"
        >
          <div className="mb-4">
            <h2
              id="manager-preferences-heading"
              className="text-base font-bold text-slate-900"
            >
              Manager notification preferences
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Choose which team updates you want to hear about.
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {notificationPreferences.map((preference) => (
              <label
                key={preference.id}
                className="flex cursor-pointer items-start gap-3 py-3.5 first:pt-1 last:pb-1"
              >
                <input
                  type="checkbox"
                  checked={Boolean(notificationPrefs[preference.id])}
                  onChange={(event) =>
                    setNotificationPrefs((current) => ({
                      ...current,
                      [preference.id]: event.target.checked,
                    }))
                  }
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>
                  <span className="block text-xs font-semibold text-slate-900">
                    {preference.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
                    {preference.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <section
          className="flex items-start gap-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6"
          aria-labelledby="manager-role-heading"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id="manager-role-heading"
              className="text-sm font-bold text-slate-900"
            >
              Workspace role: {user?.role || "Manager"}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Your role provides tools for project coordination and team task
              management.
            </p>
            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
              <span className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Create projects and assign tasks
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                Manage deadlines and task reviews
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
                <Lock
                  className="h-3.5 w-3.5 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                Admin access is restricted
              </span>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            Save changes
          </button>
        </div>
      </form>
    </main>
  );
};
