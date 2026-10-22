import { Link } from "react-router-dom";
import { ArrowRight, Plus, Sparkles } from "lucide-react";

export const DashboardWelcome = ({ user, inProgressCount, onCreateTask }) => {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#DCE5DC] bg-white p-6 shadow-sm sm:p-7">
      <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#D6B45A]/10" />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D6B45A]/50 bg-[#D6B45A]/15 px-2.5 py-1 text-xs font-semibold text-[#065F46]">
              <Sparkles className="h-3.5 w-3.5 text-[#A1873F]" /> Member workspace
            </span>
            <span className="text-xs font-medium text-[#64748B]">{today}</span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-[#18352D] sm:text-3xl">
            {greeting}, {user?.name?.split(" ")[0] || "Ananya"}
          </h1>
          <p className="mt-1.5 text-sm text-[#64748B]">
            You have <span className="font-semibold text-[#065F46]">{inProgressCount} active {inProgressCount === 1 ? "task" : "tasks"}</span> to keep moving today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onCreateTask}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#065F46] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/50"
          >
            <Plus className="h-4 w-4 text-[#D6B45A]" /> New task
          </button>
          <Link
            to="/tasks"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] px-4 py-2.5 text-xs font-semibold text-[#18352D] transition-colors hover:border-[#D6B45A] hover:bg-[#F3F5EC]"
          >
            My tasks <ArrowRight className="h-3.5 w-3.5 text-[#A1873F]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
