import { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { projectsApi, tasksApi, teamApi } from "../../services/api";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import { ProjectDetailsModal } from "../../components/modals/ProjectDetailsModal";
import { ManagerProjectsContent } from "./components/ManagerProjectsContent";

export const ManagerProjects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [projectData, taskData, memberData] = await Promise.all([
        projectsApi.getProjects(),
        tasksApi.getTasks(),
        teamApi.getTeamMembers(),
      ]);
      setProjects(projectData);
      setTasks(taskData);
      setTeamMembers(memberData);
    } catch (loadError) {
      console.error("Failed to load manager projects", loadError);
      setError("We couldn't load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateProject = async (projectData) => {
    setError("");
    try {
      const created = await projectsApi.createProject(projectData);
      setProjects((current) => [created, ...current]);
    } catch (createError) {
      console.error("Failed to create project", createError);
      setError("We couldn't create that project. Please try again.");
    }
  };

  const filteredProjects = useMemo(() => projects.filter((project) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = (project.name || "").toLowerCase().includes(query)
      || (project.description || "").toLowerCase().includes(query);
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [projects, search, statusFilter]);

  return (
    <main className="mx-auto max-w-1500px space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Team workspace</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">Oversee project progress, team assignments, and deadlines.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm" role="group" aria-label="Project view">
            <button type="button" onClick={() => setViewMode("grid")} aria-label="Grid view" aria-pressed={viewMode === "grid"} className={`rounded-lg p-2 transition-colors ${viewMode === "grid" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}><LayoutGrid className="h-4 w-4" /></button>
            <button type="button" onClick={() => setViewMode("list")} aria-label="List view" aria-pressed={viewMode === "list"} className={`rounded-lg p-2 transition-colors ${viewMode === "list" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}><List className="h-4 w-4" /></button>
          </div>
          <button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"><Plus className="h-4 w-4" />Create project</button>
        </div>
      </header>

      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search projects</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by project name or description" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </label>
        <label>
          <span className="sr-only">Filter by project status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:w-auto">
            <option value="All">All statuses</option><option value="On track">On track</option><option value="In progress">In progress</option><option value="Completed">Completed</option>
          </select>
        </label>
      </section>

      {error && <div role="alert" className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 sm:flex-row sm:items-center sm:justify-between"><span>{error}</span><button type="button" onClick={loadData} className="self-start font-semibold underline underline-offset-2 sm:self-auto">Try again</button></div>}

      <ManagerProjectsContent
        projects={filteredProjects}
        tasks={tasks}
        viewMode={viewMode}
        loading={loading}
        hasFilters={Boolean(search || statusFilter !== "All")}
        onSelectProject={setSelectedProject}
        onClearFilters={() => { setSearch(""); setStatusFilter("All"); }}
      />

      <CreateProjectModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreated={handleCreateProject} teamMembers={teamMembers} />
      <ProjectDetailsModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} tasks={tasks} teamMembers={teamMembers} />
    </main>
  );
};
