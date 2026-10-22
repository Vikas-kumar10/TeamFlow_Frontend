import { CheckCircle2, Sparkles } from "lucide-react";

const benefits = [
  "Know what needs attention next",
  "Keep task owners and deadlines clear",
  "See your team's progress together",
];

export default function SignupIntro() {
  return (
    <aside className="relative z-10 hidden lg:block">
      <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#C2410C] shadow-sm">
        <Sparkles size={13} />
        YOUR TEAM'S WORKSPACE STARTS HERE
      </span>
      <h1 className="mt-6 max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.05em] text-[#292524] xl:text-6xl">
        Make room for work that moves <span className="text-[#C2410C]">forward.</span>
      </h1>
      <p className="mt-5 max-w-lg text-base leading-7 text-stone-600">
        Create your TeamFlow account and bring projects, tasks, and your whole
        team into one clear workspace.
      </p>
      <div className="mt-9 space-y-4">
        {benefits.map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm font-medium text-stone-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 size={16} />
            </span>
            {item}
          </div>
        ))}
      </div>
    </aside>
  );
}
