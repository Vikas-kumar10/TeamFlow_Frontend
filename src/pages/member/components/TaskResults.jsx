import { CheckCircle2 } from "lucide-react";
import { TaskGridView } from "./TaskGridView";
import { TaskListView } from "./TaskListView";

export const TaskResults = ({ tasks, viewMode, today, onOpenTask, onUpdateStatus, onClearFilters }) => {
  if (tasks.length === 0) {
    return (
      <section className="rounded-2xl border border-[#DCE5DC] bg-white px-6 py-14 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F0EA] text-[#065F46]"><CheckCircle2 className="h-6 w-6" /></span>
        <h2 className="mt-3 text-sm font-bold text-[#18352D]">No matching tasks</h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#64748B]">Try adjusting your search or filters to find the task you need.</p>
        <button onClick={onClearFilters} className="mt-4 rounded-lg px-3 py-2 text-xs font-semibold text-[#065F46] transition-colors hover:bg-[#D6B45A]/15">Clear all filters</button>
      </section>
    );
  }

  return viewMode === "list" ? (
    <section className="overflow-hidden rounded-2xl border border-[#DCE5DC] bg-white shadow-sm"><TaskListView tasks={tasks} today={today} onOpenTask={onOpenTask} onUpdateStatus={onUpdateStatus} /></section>
  ) : (
    <TaskGridView tasks={tasks} today={today} onOpenTask={onOpenTask} onUpdateStatus={onUpdateStatus} />
  );
};
