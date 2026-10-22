import { Calendar, Eye, MessageSquare } from "lucide-react";
import { PriorityBadge } from "../../../components/common/Badge";

const formatDueDate = (date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const TaskListView = ({ tasks, today, onOpenTask, onUpdateStatus }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] border-collapse text-left">
      <thead>
        <tr className="border-b border-[#DCE5DC] bg-[#F8FAF5] text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
          <th className="px-5 py-3.5">Task</th><th className="px-3 py-3.5">Project</th><th className="px-3 py-3.5">Priority</th><th className="px-3 py-3.5">Due date</th><th className="px-3 py-3.5">Status</th><th className="px-4 py-3.5 text-right">Details</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E9EEE8] text-xs text-[#53665F]">
        {tasks.map((task) => {
          const overdue = task.due < today && task.status !== "Done";
          return (
            <tr key={task.id} onClick={() => onOpenTask(task)} className="group cursor-pointer transition-colors hover:bg-[#F8FAF5]">
              <td className="max-w-[280px] px-5 py-4">
                <p className="truncate font-semibold text-[#18352D] transition-colors group-hover:text-[#065F46]">{task.title}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  {task.tags?.slice(0, 3).map((tag) => <span key={tag} className="rounded-md bg-[#E8F0EA] px-1.5 py-0.5 text-[10px] font-medium text-[#53665F]">#{tag}</span>)}
                  {task.commentsCount > 0 && <span className="inline-flex items-center gap-1 text-[10px] text-[#64748B]"><MessageSquare className="h-3 w-3" />{task.commentsCount}</span>}
                </div>
              </td>
              <td className="max-w-[140px] truncate px-3 py-4 font-medium">{task.project}</td>
              <td className="px-3 py-4"><PriorityBadge priority={task.priority} /></td>
              <td className="px-3 py-4">
                <span className={`inline-flex items-center gap-1.5 font-medium ${overdue ? "text-rose-600" : "text-[#53665F]"}`}><Calendar className="h-3.5 w-3.5 text-[#94A3A0]" />{formatDueDate(task.due)}</span>
                {overdue && <span className="mt-0.5 block text-[10px] font-semibold text-rose-600">Overdue</span>}
              </td>
              <td className="px-3 py-4" onClick={(event) => event.stopPropagation()}>
                <select value={task.status} onChange={(event) => onUpdateStatus(task.id, event.target.value)} className="rounded-lg border border-[#DCE5DC] bg-white px-2 py-1.5 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
                  <option value="To Do">To Do</option><option value="In Progress">In Progress</option><option value="In Review">In Review</option><option value="Done">Done</option>
                </select>
              </td>
              <td className="px-4 py-4 text-right" onClick={(event) => event.stopPropagation()}>
                <button onClick={() => onOpenTask(task)} aria-label={`View ${task.title}`} title="View task details" className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#D6B45A]/15 hover:text-[#065F46]"><Eye className="h-4 w-4" /></button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
