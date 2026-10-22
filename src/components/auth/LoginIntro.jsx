import { Sparkles, UserCheck } from "lucide-react";

const benefits = [
  "See your priorities at a glance",
  "Keep projects and tasks connected",
  "Stay in sync with your team",
];

export default function LoginIntro() {
  return (
    <aside className="relative z-10 hidden lg:block">
      <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#C2410C] shadow-sm">
        <Sparkles size={13} /> WELCOME BACK TO TEAMFLOW
      </span>
      <h1 className="mt-6 max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.05em] text-[#292524] xl:text-6xl">
        Your team's work, moving <span className="text-[#C2410C]">forward.</span>
      </h1>
      <p className="mt-5 max-w-lg text-base leading-7 text-stone-600">
        Sign in to see your projects, pick up where you left off, and keep your
        team moving together.
      </p>
      <div className="mt-9 space-y-4">
        {benefits.map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm font-medium text-stone-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
              <UserCheck size={16} />
            </span>
            {item}
          </div>
        ))}
      </div>
    </aside>
  );
}
