import { Search } from "lucide-react";

export const TaskFilters = ({
  tasks,
  statusTab,
  onStatusChange,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  projectFilter,
  onProjectChange,
  sortBy,
  onSortChange,
  projects,
}) => {
  const tabs = ["All", "To Do", "In Progress", "In Review", "Done"];

  return (
    <section className="space-y-4">
      <div className="flex gap-1 overflow-x-auto border-b border-[#DCE5DC]">
        {tabs.map((tab) => {
          const count = tab === "All" ? tasks.length : tasks.filter((task) => task.status === tab).length;
          const active = statusTab === tab;
          return (
            <button key={tab} onClick={() => onStatusChange(tab)} aria-pressed={active} className={`flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-semibold transition-colors ${active ? "border-[#065F46] text-[#065F46]" : "border-transparent text-[#64748B] hover:bg-[#F1F5EF] hover:text-[#18352D]"}`}>
              {tab}
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-[#D6B45A]/20 text-[#065F46]" : "bg-[#E8F0EA] text-[#64748B]"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#DCE5DC] bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search tasks</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3A0]" />
          <input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search by title, project, or tag..." className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] py-2.5 pl-10 pr-3.5 text-xs text-[#18352D] placeholder:text-[#94A3A0] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30" />
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:flex">
          <label>
            <span className="sr-only">Filter by priority</span>
            <select value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value)} className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] px-3 py-2.5 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
              <option value="All">All priorities</option><option value="High">High priority</option><option value="Medium">Medium priority</option><option value="Low">Low priority</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by project</span>
            <select value={projectFilter} onChange={(event) => onProjectChange(event.target.value)} className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] px-3 py-2.5 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
              <option value="All">All projects</option>
              {projects.map((project) => <option key={project.id} value={project.name}>{project.name}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort tasks</span>
            <select value={sortBy} onChange={(event) => onSortChange(event.target.value)} className="w-full rounded-xl border border-[#DCE5DC] bg-[#F8FAF5] px-3 py-2.5 text-xs font-medium text-[#53665F] focus:border-[#065F46] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/30">
              <option value="due">Sort: due date</option><option value="priority">Sort: priority</option><option value="title">Sort: title</option>
            </select>
          </label>
        </div>
      </div>
    </section>
  );
};
