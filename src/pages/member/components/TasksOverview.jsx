import { AlertCircle, CheckCircle2, Circle, ListTodo } from "lucide-react";

const metrics = [
  { key: "total", label: "Total tasks", icon: ListTodo, tone: "bg-emerald-50 text-emerald-700" },
  { key: "active", label: "In progress", icon: Circle, tone: "bg-sky-50 text-sky-700" },
  { key: "overdue", label: "Overdue", icon: AlertCircle, tone: "bg-rose-50 text-rose-700" },
  { key: "done", label: "Completed", icon: CheckCircle2, tone: "bg-amber-50 text-amber-700" },
];

export const TasksOverview = ({ tasks, today }) => {
  const counts = {
    total: tasks.length,
    active: tasks.filter((task) => task.status === "In Progress").length,
    overdue: tasks.filter((task) => task.due < today && task.status !== "Done").length,
    done: tasks.filter((task) => task.status === "Done").length,
  };

  return (
    <section aria-label="Task overview" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {metrics.map(({ key, label, icon: Icon, tone }) => (
        <article key={key} className="flex items-center gap-3 rounded-2xl border border-[#DCE5DC] bg-white p-4 shadow-sm sm:p-5">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xl font-bold leading-none text-[#18352D]">{counts[key]}</p>
            <p className="mt-1.5 text-[11px] font-medium text-[#64748B] sm:text-xs">{label}</p>
          </div>
        </article>
      ))}
    </section>
  );
};
