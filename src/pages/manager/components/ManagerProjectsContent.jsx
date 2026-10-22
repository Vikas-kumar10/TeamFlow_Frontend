import { ArrowRight, FolderKanban } from "lucide-react";
import { ProjectStatusBadge } from "../../../components/common/Badge";

const projectStats = (project, tasks) => {
  const projectTasks = tasks.filter((task) => task.project === project.name);
  return {
    total: projectTasks.length,
    completed: projectTasks.filter((task) => task.status === "Done").length,
  };
};

const EmptyState = ({ hasFilters, onClearFilters }) => (
  <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><FolderKanban className="h-6 w-6" aria-hidden="true" /></span>
    <h2 className="mt-3 text-sm font-bold text-slate-900">{hasFilters ? "No matching projects" : "No projects yet"}</h2>
    <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{hasFilters ? "Try changing your search or status filter." : "Create a project to organize your team's work."}</p>
    {hasFilters && <button type="button" onClick={onClearFilters} className="mt-4 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-50">Clear filters</button>}
  </section>
);

const GridView = ({ projects, tasks, onSelectProject }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
    {projects.map((project) => {
      const stats = projectStats(project, tasks);
      const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));
      const membersCount = project.members?.length ?? project.membersCount ?? 0;
      return (
        <article key={project.id} className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6">
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="max-w-[65%] truncate rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">{project.category || "General"}</span>
              <ProjectStatusBadge status={project.status} />
            </div>
            <h2 className="text-base font-bold leading-snug text-slate-900">{project.name}</h2>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">{project.description || "No project description provided."}</p>
          </div>
          <div className="mt-5 space-y-4 border-t border-slate-100 pt-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-medium text-slate-500">Project progress</span><span className="font-bold text-slate-800">{progress}%</span></div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center">
              <div><span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">Tasks</span><span className="mt-1 block text-xs font-bold text-slate-800">{stats.completed}/{stats.total}</span></div>
              <div><span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">Members</span><span className="mt-1 block text-xs font-bold text-slate-800">{membersCount}</span></div>
              <div><span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">Due date</span><span className="mt-1 block truncate text-xs font-bold text-slate-800">{project.dueDate || "Not set"}</span></div>
            </div>
            <button type="button" onClick={() => onSelectProject(project)} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30">View project details<ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
        </article>
      );
    })}
  </div>
);

const ListView = ({ projects, tasks, onSelectProject }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse text-left">
        <thead><tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><th className="px-5 py-3">Project</th><th className="px-3 py-3">Category</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Tasks</th><th className="px-3 py-3">Progress</th><th className="px-3 py-3">Deadline</th><th className="px-4 py-3 text-right">Action</th></tr></thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {projects.map((project) => {
            const stats = projectStats(project, tasks);
            const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));
            return <tr key={project.id} className="transition-colors hover:bg-slate-50/80">
              <td className="max-w-[300px] px-5 py-3.5"><p className="truncate font-bold text-slate-900">{project.name}</p><p className="mt-0.5 truncate text-[11px] text-slate-400">{project.description || "No description"}</p></td>
              <td className="px-3 py-3.5">{project.category || "General"}</td>
              <td className="px-3 py-3.5"><ProjectStatusBadge status={project.status} /></td>
              <td className="whitespace-nowrap px-3 py-3.5 font-semibold">{stats.completed}/{stats.total} done</td>
              <td className="min-w-[130px] px-3 py-3.5"><div className="flex items-center gap-2"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} /></div><span className="font-bold text-blue-700">{progress}%</span></div></td>
              <td className="whitespace-nowrap px-3 py-3.5">{project.dueDate || "Not set"}</td>
              <td className="px-4 py-3.5 text-right"><button type="button" onClick={() => onSelectProject(project)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50">Details</button></td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export const ManagerProjectsContent = ({ projects, tasks, viewMode, loading, hasFilters, onSelectProject, onClearFilters }) => {
  if (loading) return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3" aria-label="Loading projects" aria-busy="true">{[0, 1, 2].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl border border-slate-100 bg-white" />)}</div>;
  if (!projects.length) return <EmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />;
  return viewMode === "grid" ? <GridView projects={projects} tasks={tasks} onSelectProject={onSelectProject} /> : <ListView projects={projects} tasks={tasks} onSelectProject={onSelectProject} />;
};
