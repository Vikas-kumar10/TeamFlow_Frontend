import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckSquare, Eye, Search } from "lucide-react";
import { PriorityBadge } from "../../../components/common/Badge";

export const UpcomingTasks = ({
  tasks,
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  today,
  onOpenTask,
  onUpdateStatus,
  onResetFilters,
  formatDate,
}) => (
  <section className="overflow-hidden rounded-2xl border border-[#DCE5DC] bg-white shadow-sm">
    <div className="space-y-4 border-b border-[#DCE5DC] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#18352D]">Upcoming tasks</h2>
          <p className="mt-1 text-xs text-[#64748B]">{tasks.length} {tasks.length === 1 ? "task" : "tasks"} match your view</p>
        </div>
        <Link to="/tasks" className="inline-flex items-center gap-1 self-start text-xs font-semibold text-[#065F46] hover:text-[#A1873F] sm:self-auto">
          View all tasks <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search tasks or projects</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3A0]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks or projects..."
            className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] py-2.5 pl-9 pr-3 text-xs text-[#18352D] placeholder:text-[#94A3A0] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30"
          />
        </label>
        <div className="flex gap-2">
          <label>
            <span className="sr-only">Filter by status</span>
            <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)} className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] py-2.5 pl-3 pr-7 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
              <option value="All">All statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Sort tasks</span>
            <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] py-2.5 pl-3 pr-7 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
              <option value="due">Due date</option>
              <option value="priority">Priority</option>
            </select>
          </label>
        </div>
      </div>
    </div>

    {tasks.length === 0 ? (
      <div className="px-6 py-12 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F0EA] text-[#065F46]"><CheckSquare className="h-6 w-6" /></div>
        <h3 className="text-sm font-bold text-[#18352D]">No tasks found</h3>
        <p className="mx-auto mt-1 max-w-sm text-xs text-[#64748B]">Try changing your search or filters to see more tasks.</p>
        {(search || statusFilter !== "All") && <button onClick={onResetFilters} className="mt-3 text-xs font-semibold text-[#065F46] hover:text-[#A1873F]">Reset filters</button>}
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#DCE5DC] bg-[#F8FAF5] text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
              <th className="px-5 py-3">Task</th><th className="px-3 py-3">Project</th><th className="px-3 py-3">Priority</th><th className="px-3 py-3">Due date</th><th className="px-3 py-3">Status</th><th className="px-4 py-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9EEE8] text-xs text-[#53665F]">
            {tasks.map((task) => {
              const overdue = task.due < today && task.status !== "Done";
              return (
                <tr key={task.id} onClick={() => onOpenTask(task)} className="group cursor-pointer transition-colors hover:bg-[#F8FAF5]">
                  <td className="max-w-[260px] px-5 py-3.5">
                    <p className="truncate font-semibold text-[#18352D] transition-colors group-hover:text-[#065F46]">{task.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-[#64748B]">{task.description}</p>
                  </td>
                  <td className="max-w-[140px] truncate px-3 py-3.5 font-medium">{task.project}</td>
                  <td className="px-3 py-3.5"><PriorityBadge priority={task.priority} /></td>
                  <td className="px-3 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 font-medium ${overdue ? "text-rose-600" : "text-[#53665F]"}`}><Calendar className="h-3.5 w-3.5 text-[#94A3A0]" />{formatDate(task.due)}</span>
                    {overdue && <span className="mt-0.5 block text-[10px] font-semibold text-rose-600">Overdue</span>}
                  </td>
                  <td className="px-3 py-3.5" onClick={(event) => event.stopPropagation()}>
                    <select value={task.status} onChange={(event) => onUpdateStatus(task.id, event.target.value)} className="rounded-lg border border-[#DCE5DC] bg-white px-2 py-1.5 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
                      <option value="To Do">To Do</option><option value="In Progress">In Progress</option><option value="In Review">In Review</option><option value="Done">Done</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 text-right" onClick={(event) => event.stopPropagation()}>
                    <button onClick={() => onOpenTask(task)} title="View task details" aria-label={`View ${task.title}`} className="rounded-lg p-2 text-[#64748B] transition-colors hover:bg-[#D6B45A]/15 hover:text-[#065F46]"><Eye className="h-4 w-4" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </section>
);
