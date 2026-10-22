import { AlertCircle } from "lucide-react";
import { PriorityBadge } from "../../../components/common/Badge";

const columns = [
  { id: "To Do", title: "To do", tone: "border-t-slate-400", badge: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
  { id: "In Progress", title: "In progress", tone: "border-t-blue-500", badge: "bg-blue-50 text-blue-700", dot: "bg-blue-500" },
  { id: "In Review", title: "In review", tone: "border-t-violet-500", badge: "bg-violet-50 text-violet-700", dot: "bg-violet-500" },
  { id: "Done", title: "Done", tone: "border-t-emerald-500", badge: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
];

const TaskCard = ({ task, member, updating, onOpen, onStatusChange }) => {
  const initials = task.assignee?.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "?";
  const dueDate = task.due ? new Date(`${task.due}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No due date";
  const overdue = task.due && task.due < new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 10) && task.status !== "Done";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="max-w-[65%] truncate rounded-lg bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600">{task.project || "No project"}</span>
        <PriorityBadge priority={task.priority} />
      </div>
      <button type="button" onClick={() => onOpen(task)} className="block w-full text-left text-xs font-bold leading-snug text-slate-900 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 sm:text-sm">{task.title}</button>
      {task.description && <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-500">{task.description}</p>}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <div className="flex min-w-0 items-center gap-2">
          {member?.avatar ? <img src={member.avatar} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" /> : <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-700">{initials}</span>}
          <span className="truncate text-[10px] font-medium text-slate-600">{task.assignee || "Unassigned"}</span>
        </div>
        <span className={`flex shrink-0 items-center gap-1 text-[10px] font-medium ${overdue ? "text-rose-600" : "text-slate-500"}`}>
          {overdue && <AlertCircle className="h-3 w-3" aria-hidden="true" />}{dueDate}
        </span>
      </div>
      <label className="sr-only" htmlFor={`task-status-${task.id}`}>Update status for {task.title}</label>
      <select id={`task-status-${task.id}`} value={task.status} disabled={updating} onChange={(event) => onStatusChange(task.id, event.target.value)} className="mt-3 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] font-semibold text-slate-700 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-wait disabled:opacity-60">
        <option value="To Do">To do</option><option value="In Progress">In progress</option><option value="In Review">In review</option><option value="Done">Done</option>
      </select>
    </article>
  );
};

export const ManagerKanbanBoard = ({ tasks, teamMembers, updatingTaskId, onOpenTask, onStatusChange }) => (
  <section aria-label="Tasks by status" className="-mx-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
    <div className="grid min-w-[1120px] grid-cols-4 items-start gap-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return (
          <section key={column.id} aria-labelledby={`kanban-${column.id.replaceAll(" ", "-")}`} className={`min-h-[420px] rounded-2xl border border-slate-200 border-t-4 bg-slate-50/70 p-3.5 ${column.tone}`}>
            <header className="mb-3 flex items-center justify-between border-b border-slate-200/80 px-1 pb-3">
              <h2 id={`kanban-${column.id.replaceAll(" ", "-")}`} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-800"><span className={`h-2 w-2 rounded-full ${column.dot}`} />{column.title}</h2>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${column.badge}`}>{columnTasks.length}</span>
            </header>
            <div className="space-y-3">
              {columnTasks.length ? columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} member={teamMembers.find((item) => item.name === task.assignee)} updating={updatingTaskId === task.id} onOpen={onOpenTask} onStatusChange={onStatusChange} />
              )) : <p className="rounded-xl border border-dashed border-slate-200 bg-white/70 px-3 py-8 text-center text-[11px] text-slate-400">Nothing in this stage</p>}
            </div>
          </section>
        );
      })}
    </div>
  </section>
);
