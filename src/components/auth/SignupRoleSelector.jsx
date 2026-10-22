import { CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";

export default function SignupRoleSelector({ role, onRoleChange }) {
  const roleClassName = (selected) =>
    `w-full rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100 ${
      selected
        ? "border-[#C2410C] bg-orange-50 shadow-sm"
        : "border-[#E7E5E4] bg-white hover:border-orange-200"
    }`;

  return (
    <fieldset>
      <legend className="mb-2.5 text-xs font-semibold text-stone-700">
        Choose your workspace role
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" aria-pressed={role === "Member"} onClick={() => onRoleChange("Member")} className={roleClassName(role === "Member")}>
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-[#292524]"><UserCheck size={17} className="text-[#C2410C]" /> Member</span>
            {role === "Member" && <CheckCircle2 size={17} className="text-[#16A34A]" />}
          </span>
          <span className="mt-2 block text-xs leading-5 text-stone-500">Work on assigned tasks and follow your project progress.</span>
        </button>
        <button type="button" aria-pressed={role === "Manager"} onClick={() => onRoleChange("Manager")} className={roleClassName(role === "Manager")}>
          <span className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-[#292524]"><ShieldCheck size={17} className="text-[#C2410C]" /> Manager</span>
            {role === "Manager" && <CheckCircle2 size={17} className="text-[#16A34A]" />}
          </span>
          <span className="mt-2 block text-xs leading-5 text-stone-500">Create projects, assign tasks, and track team progress.</span>
        </button>
      </div>
    </fieldset>
  );
}
