import { Calendar } from "lucide-react";
import { PriorityBadge } from "../../../components/common/Badge";

const formatDueDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const TaskGridView = ({ tasks, today, onOpenTask, onUpdateStatus }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
    {tasks.map((task) => {
      const overdue = task.due < today && task.status !== "Done";
      return (
        <article key={task.id} onClick={() => onOpenTask(task)} className="flex cursor-pointer flex-col justify-between rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D6B45A]/70 hover:shadow-md">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="max-w-[65%] truncate rounded-md bg-[#E8F0EA] px-2 py-1 text-[10px] font-semibold text-[#065F46]">{task.project}</span>
              <PriorityBadge priority={task.priority} />
            </div>
            <h2 className="text-sm font-bold leading-snug text-[#18352D]">{task.title}</h2>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#64748B]">{task.description}</p>
            {task.tags?.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{task.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md border border-[#DCE5DC] px-1.5 py-0.5 text-[10px] text-[#64748B]">#{tag}</span>)}</div>}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E9EEE8] pt-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${overdue ? "text-rose-600" : "text-[#64748B]"}`}><Calendar className="h-3.5 w-3.5 text-[#A1873F]" />{formatDueDate(task.due)}</span>
            <div onClick={(event) => event.stopPropagation()}>
              <select value={task.status} onChange={(event) => onUpdateStatus(task.id, event.target.value)} aria-label={`Update ${task.title} status`} className="max-w-[132px] rounded-lg border border-[#DCE5DC] bg-[#F8FAF5] px-2 py-1.5 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
                <option value="To Do">To Do</option><option value="In Progress">In Progress</option><option value="In Review">In Review</option><option value="Done">Done</option>
              </select>
            </div>
          </div>
        </article>
      );
    })}
  </div>
);
