import { AlertTriangle, CheckCircle2, Filter, Search } from "lucide-react";
import { PriorityBadge } from "../../../components/common/Badge";

const tabs = ["All", "To Do", "In Progress", "In Review", "Done", "Overdue"];
const selectClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const TaskFilters = ({ allTasks, projects, teamMembers, today, searchQuery, onSearchChange, statusTab, onStatusChange, projectFilter, onProjectChange, memberFilter, onMemberChange, priorityFilter, onPriorityChange }) => (
  <section className="space-y-4" aria-label="Filter team tasks">
    <div className="flex gap-1 overflow-x-auto border-b border-slate-200" role="tablist" aria-label="Filter tasks by status">
      {tabs.map((tab) => {
        const count = tab === "All" ? allTasks.length : tab === "Overdue"
          ? allTasks.filter((task) => task.due < today && task.status !== "Done").length
          : allTasks.filter((task) => task.status === tab).length;
        const active = statusTab === tab;
        return <button key={tab} type="button" role="tab" aria-selected={active} onClick={() => onStatusChange(tab)} className={`flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-semibold transition-colors ${active ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
          {tab}<span className={`rounded-full px-2 py-0.5 text-[10px] ${tab === "Overdue" && count ? "bg-rose-100 text-rose-700" : active ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{count}</span>
        </button>;
      })}
    </div>

    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm lg:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(140px,180px))]">
      <label className="relative min-w-0">
        <span className="sr-only">Search by task, project, or member</span>
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input type="search" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search tasks, projects, members" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
      </label>
      <label><span className="sr-only">Filter by project</span><select value={projectFilter} onChange={(event) => onProjectChange(event.target.value)} className={selectClass}><option value="All">All projects</option>{projects.map((project) => <option key={project.id} value={project.name}>{project.name}</option>)}</select></label>
      <label><span className="sr-only">Filter by team member</span><select value={memberFilter} onChange={(event) => onMemberChange(event.target.value)} className={selectClass}><option value="All">All members</option>{teamMembers.map((member) => <option key={member.id} value={member.name}>{member.name}</option>)}</select></label>
      <label><span className="sr-only">Filter by priority</span><select value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value)} className={selectClass}><option value="All">All priorities</option><option value="High">High priority</option><option value="Medium">Medium priority</option><option value="Low">Low priority</option></select></label>
    </div>
  </section>
);

const LoadingState = () => (
  <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" aria-label="Loading tasks" aria-busy="true">
    <div className="h-8 animate-pulse rounded-lg bg-slate-100" />
    {[0, 1, 2, 3, 4].map((item) => <div key={item} className="h-14 animate-pulse rounded-lg bg-slate-50" />)}
  </div>
);

const TaskTable = ({ tasks, teamMembers, today, updatingTaskId, onSelectTask, onUpdateTask }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[980px] border-collapse text-left">
      <thead><tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><th className="px-5 py-3">Task</th><th className="px-3 py-3">Project</th><th className="px-3 py-3">Assignee</th><th className="px-3 py-3">Priority</th><th className="px-3 py-3">Due date</th><th className="px-3 py-3">Status</th><th className="px-4 py-3 text-right">Details</th></tr></thead>
      <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
        {tasks.map((task) => {
          const overdue = task.due < today && task.status !== "Done";
          const member = teamMembers.find((item) => item.name === task.assignee);
          const initials = task.assignee?.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "?";
          return <tr key={task.id} className="transition-colors hover:bg-slate-50/80">
            <td className="max-w-[260px] px-5 py-3.5"><p className="truncate font-semibold text-slate-900">{task.title || "Untitled task"}</p>{task.tags?.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{task.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] text-slate-500">#{tag}</span>)}</div>}</td>
            <td className="max-w-[150px] truncate px-3 py-3.5 font-medium text-slate-600">{task.project || "—"}</td>
            <td className="px-3 py-3.5"><div className="flex items-center gap-2">{member?.avatar ? <img src={member.avatar} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" /> : <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-700">{initials}</span>}<span className="max-w-[130px] truncate font-medium text-slate-700">{task.assignee || "Unassigned"}</span></div></td>
            <td className="px-3 py-3.5"><PriorityBadge priority={task.priority} /></td>
            <td className="whitespace-nowrap px-3 py-3.5"><span className={overdue ? "font-semibold text-rose-600" : "text-slate-600"}>{task.due || "No date"}</span>{overdue && <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-rose-600"><AlertTriangle className="h-3 w-3" />Overdue</span>}</td>
            <td className="px-3 py-3.5"><label className="sr-only" htmlFor={`manager-task-status-${task.id}`}>Update status for {task.title}</label><select id={`manager-task-status-${task.id}`} disabled={updatingTaskId === task.id} value={task.status} onChange={(event) => onUpdateTask(task.id, { status: event.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-wait disabled:opacity-60"><option value="To Do">To do</option><option value="In Progress">In progress</option><option value="In Review">In review</option><option value="Done">Done</option></select></td>
            <td className="px-4 py-3.5 text-right"><button type="button" onClick={() => onSelectTask(task)} aria-label={`View ${task.title}`} className="rounded-lg px-2.5 py-1.5 font-semibold text-blue-700 transition-colors hover:bg-blue-50">Details</button></td>
          </tr>;
        })}
      </tbody>
    </table>
  </div>
);

export const ManagerTasksContent = ({ tasks, allTasks, projects, teamMembers, loading, updatingTaskId, today, searchQuery, onSearchChange, statusTab, onStatusChange, projectFilter, onProjectChange, memberFilter, onMemberChange, priorityFilter, onPriorityChange, onClearFilters, onSelectTask, onUpdateTask }) => (
  <div className="space-y-4">
    <TaskFilters allTasks={allTasks} projects={projects} teamMembers={teamMembers} today={today} searchQuery={searchQuery} onSearchChange={onSearchChange} statusTab={statusTab} onStatusChange={onStatusChange} projectFilter={projectFilter} onProjectChange={onProjectChange} memberFilter={memberFilter} onMemberChange={onMemberChange} priorityFilter={priorityFilter} onPriorityChange={onPriorityChange} />
    {loading ? <LoadingState /> : tasks.length === 0 ? (
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><CheckCircle2 className="h-6 w-6" aria-hidden="true" /></span>
        <h2 className="mt-3 text-sm font-bold text-slate-900">{allTasks.length ? "No matching tasks" : "No tasks yet"}</h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{allTasks.length ? "Try adjusting the search or filters." : "Create a task to get work moving across your team."}</p>
        {allTasks.length > 0 && <button type="button" onClick={onClearFilters} className="mt-3 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50">Reset filters</button>}
      </section>
    ) : (
      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5"><div className="flex items-center gap-2 text-xs font-semibold text-slate-700"><Filter className="h-3.5 w-3.5 text-slate-400" />Task results</div><span className="text-[11px] text-slate-500">{tasks.length} {tasks.length === 1 ? "task" : "tasks"}</span></div>
        <TaskTable tasks={tasks} teamMembers={teamMembers} today={today} updatingTaskId={updatingTaskId} onSelectTask={onSelectTask} onUpdateTask={onUpdateTask} />
      </section>
    )}
  </div>
);
