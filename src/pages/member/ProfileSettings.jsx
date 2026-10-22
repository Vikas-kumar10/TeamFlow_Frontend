import { useEffect, useMemo, useState } from "react";
import { Briefcase, CheckCircle2, Mail, MapPin, Phone, Save, Shield, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const fields = [
  { key: "name", label: "Full name", icon: User, autoComplete: "name", required: true },
  { key: "email", label: "Email address", icon: Mail, type: "email", autoComplete: "email", required: true },
  { key: "title", label: "Job title", icon: Briefcase, autoComplete: "organization-title" },
  { key: "department", label: "Department", autoComplete: "organization" },
  { key: "location", label: "Location", icon: MapPin, autoComplete: "address-level2" },
  { key: "phone", label: "Phone", icon: Phone, type: "tel", autoComplete: "tel" },
];

const preferences = [
  { id: "emailOnAssign", title: "Task assignments", description: "Get an alert when a task is assigned to you." },
  { id: "emailOnComment", title: "Comments and mentions", description: "Get notified when someone comments on your tasks." },
  { id: "deadlineAlerts", title: "Deadline reminders", description: "Receive a reminder before a task is due." },
  { id: "weeklyDigest", title: "Weekly summary", description: "Get a Monday summary of your tasks and progress." },
];

const inputClass = "w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] px-3.5 py-2.5 text-sm text-[#18352D] placeholder:text-[#94A3A0] transition focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30";

const ProfileField = ({ field, value, onChange }) => {
  const Icon = field.icon;
  const id = `profile-${field.key}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#53665F]">
        {Icon && <Icon className="h-3.5 w-3.5 text-[#94A3A0]" aria-hidden="true" />}{field.label}
      </label>
      <input id={id} name={field.key} type={field.type || "text"} autoComplete={field.autoComplete} required={field.required} value={value} onChange={onChange} className={inputClass} />
    </div>
  );
};

export const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const formData = useMemo(() => ({
    name: user?.name || "",
    email: user?.email || "",
    title: user?.title || "",
    department: user?.department || "",
    location: user?.location || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  }), [user]);
  const [values, setValues] = useState(formData);
  const [notificationPrefs, setNotificationPrefs] = useState(user?.notificationPrefs || {
    emailOnAssign: true,
    emailOnComment: true,
    deadlineAlerts: true,
    weeklyDigest: false,
  });

  useEffect(() => {
    setValues(formData);
    setNotificationPrefs(user?.notificationPrefs || {
      emailOnAssign: true,
      emailOnComment: true,
      deadlineAlerts: true,
      weeklyDigest: false,
    });
  }, [formData, user?.notificationPrefs]);

  useEffect(() => {
    if (!savedSuccess) return undefined;
    const timeoutId = window.setTimeout(() => setSavedSuccess(false), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [savedSuccess]);

  const initials = values.name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "TF";

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile({ ...values, notificationPrefs });
    setSavedSuccess(true);
  };

  return (
    <main className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A1873F]">Account</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#18352D]">Profile &amp; settings</h1>
        <p className="mt-1 text-sm text-[#64748B]">Manage your profile details and notification preferences.</p>
      </header>

      {savedSuccess && (
        <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" /> Your profile and preferences have been saved.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <section className="space-y-5 rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm sm:p-6" aria-labelledby="profile-heading">
          <div className="flex items-center gap-4 border-b border-[#E9EEE8] pb-5">
            {user?.avatar ? (
              <img src={user.avatar} alt="" className="h-14 w-14 rounded-2xl object-cover ring-4 ring-[#E8F0EA]" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F0EA] text-base font-bold text-[#065F46]" aria-hidden="true">{initials}</div>
            )}
            <div className="min-w-0">
              <h2 id="profile-heading" className="truncate text-base font-bold text-[#18352D]">{values.name || "Your profile"}</h2>
              <p className="mt-0.5 truncate text-xs text-[#64748B]">{values.title || "Team member"}</p>
            </div>
            <span className="ml-auto rounded-full border border-[#DCE5DC] bg-[#F8FAF5] px-2.5 py-1 text-[10px] font-bold text-[#065F46]">{user?.role || "Member"}</span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <ProfileField key={field.key} field={field} value={values[field.key]} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} />
            ))}
          </div>
          <div>
            <label htmlFor="profile-bio" className="mb-1.5 block text-xs font-semibold text-[#53665F]">About me</label>
            <textarea id="profile-bio" name="bio" rows={4} value={values.bio} onChange={(event) => setValues((current) => ({ ...current, bio: event.target.value }))} placeholder="Share a little about yourself" className={`${inputClass} resize-y`} />
          </div>
        </section>

        <section className="rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm sm:p-6" aria-labelledby="preferences-heading">
          <div className="mb-4">
            <h2 id="preferences-heading" className="text-base font-bold text-[#18352D]">Notification preferences</h2>
            <p className="mt-1 text-xs text-[#64748B]">Choose which updates you want to receive.</p>
          </div>
          <div className="divide-y divide-[#E9EEE8]">
            {preferences.map((preference) => (
              <label key={preference.id} className="flex cursor-pointer items-start gap-3 py-3.5 first:pt-1 last:pb-1">
                <input type="checkbox" checked={Boolean(notificationPrefs[preference.id])} onChange={(event) => setNotificationPrefs((current) => ({ ...current, [preference.id]: event.target.checked }))} className="mt-0.5 h-4 w-4 rounded border-[#B7C7BE] text-[#065F46] focus:ring-[#065F46]" />
                <span>
                  <span className="block text-xs font-semibold text-[#18352D]">{preference.title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-[#64748B]">{preference.description}</span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="flex items-start gap-3 rounded-2xl border border-[#DCE5DC] bg-white p-4 shadow-sm sm:p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#065F46]"><Shield className="h-5 w-5" aria-hidden="true" /></span>
          <div>
            <h2 className="text-xs font-bold text-[#18352D]">Workspace role: {user?.role || "Member"}</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#64748B]">Your role determines access to projects and workspace tools.</p>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#065F46] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/50">
            <Save className="h-4 w-4" aria-hidden="true" /> Save changes
          </button>
        </div>
      </form>
    </main>
  );
};
