import { ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function LoginDemoOptions({ onDemoLogin }) {
  return (
    <div className="mt-7 border-t border-[#E7E5E4] pt-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-stone-700">Try a demo workspace</p>
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-[#C2410C]">
          One click
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onDemoLogin("Member")}
          className="group rounded-xl border border-[#E7E5E4] bg-white p-3.5 text-left transition hover:border-orange-200 hover:bg-orange-50/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-[#292524]">
            <UserCheck size={16} className="text-[#C2410C]" /> Member demo
          </span>
          <span className="mt-1 block text-xs text-stone-500">
            Ananya Sharma · Designer
          </span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C]">
            Continue as member{" "}
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </button>
        <button
          type="button"
          onClick={() => onDemoLogin("Manager")}
          className="group rounded-xl border border-[#E7E5E4] bg-white p-3.5 text-left transition hover:border-orange-200 hover:bg-orange-50/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-100"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-[#292524]">
            <ShieldCheck size={16} className="text-[#C2410C]" /> Manager demo
          </span>
          <span className="mt-1 block text-xs text-stone-500">
            Marcus Vance · Manager
          </span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C]">
            Continue as manager{" "}
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
