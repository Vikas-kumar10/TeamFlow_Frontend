import { ArrowRight, AlertCircle, Calendar, CheckCircle2, CheckSquare, Clock, Eye, FolderKanban, Plus, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../../../components/common/StatCard";
import { PriorityBadge, ProjectStatusBadge } from "../../../components/common/Badge";

const panelClass = "rounded-2xl border border-slate-200/90 bg-white shadow-sm";

export const ManagerDashboardHeader = ({ name, onCreateProject, onCreateTask }) => (
  <header className="flex flex-col gap-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Manager workspace
        </span>
        <span className="text-xs text-slate-400">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</span>
      </div>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Welcome back, {name}</h1>
      <p className="mt-1 text-sm text-slate-500">Here’s your team’s work, project progress, and upcoming deadlines.</p>
    </div>
    <div className="flex flex-wrap gap-2.5">
      <button type="button" onClick={onCreateProject} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30">
        <FolderKanban className="h-4 w-4 text-blue-600" /> New project
      </button>
      <button type="button" onClick={onCreateTask} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
        <Plus className="h-4 w-4" /> Assign task
      </button>
    </div>
  </header>
);

const DashboardMetrics = ({ stats }) => (
  <section aria-label="Team summary" className="grid grid-cols-2 gap-3 xl:grid-cols-5">
    <StatCard title="Projects" value={stats.totalProjects} icon={FolderKanban} badge="Workspace" color="indigo" subtext="Under management" />
    <StatCard title="Tasks" value={stats.totalTasks} icon={CheckSquare} badge="Assigned" color="blue" subtext="Across all teams" />
    <StatCard title="In progress" value={stats.inProgress} icon={Clock} badge="Active" color="blue" subtext="In progress or review" />
    <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} badge={`${stats.totalTasks ? Math.round((stats.completed / stats.totalTasks) * 100) : 0}%`} color="emerald" subtext="Tasks marked done" />
    <StatCard title="Overdue" value={stats.overdue} icon={AlertCircle} badge={stats.overdue ? "Attention" : "Clear"} color="rose" subtext={stats.overdue ? "Past due date" : "No overdue tasks"} />
  </section>
);

const SectionHeading = ({ title, description, href, linkLabel }) => (
  <div className="flex items-end justify-between gap-3">
    <div>
      <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">{title}</h2>
      <p className="mt-0.5 text-xs text-slate-500">{description}</p>
    </div>
    {href && <Link to={href} className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800">{linkLabel}<ArrowRight className="h-3.5 w-3.5" /></Link>}
  </div>
);

const ProjectOverview = ({ projects, tasks, onSelectProject }) => (
  <section className="space-y-4">
    <SectionHeading title="Project overview" description="Progress across your team’s active projects." href="/manager/projects" linkLabel="All projects" />
    {projects.length === 0 ? <EmptyPanel message="No projects yet. Create a project to get your team started." /> : (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {projects.slice(0, 3).map((project) => {
          const projectTasks = tasks.filter((task) => task.project === project.name);
          const completed = projectTasks.filter((task) => task.status === "Done").length;
          const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));
          return (
            <article key={project.id} className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="max-w-[65%] truncate rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">{project.category || "General"}</span>
                  <ProjectStatusBadge status={project.status} />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{project.name}</h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{project.description || "No project description provided."}</p>
              </div>
              <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                <div>
                  <div className="mb-1.5 flex justify-between text-xs"><span className="text-slate-500">Progress</span><span className="font-bold text-slate-800">{progress}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} /></div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span>{projectTasks.length} tasks</span><span className="font-semibold text-emerald-700">{completed} done</span><span>Due {project.dueDate || "Not set"}</span>
                </div>
                <button type="button" onClick={() => onSelectProject(project)} className="w-full rounded-xl bg-blue-50 py-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100">View project</button>
              </div>
            </article>
          );
        })}
      </div>
    )}
  </section>
);

const RecentTasks = ({ tasks, today, onSelectTask, onUpdateTask }) => (
  <section className={`${panelClass} min-w-0 overflow-hidden`}>
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
      <div><h2 className="text-sm font-bold text-slate-900">Recent tasks</h2><p className="mt-0.5 text-xs text-slate-500">Quick view of assigned work.</p></div>
      <Link to="/manager/tasks" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600">All tasks<ArrowRight className="h-3.5 w-3.5" /></Link>
    </div>
    {tasks.length === 0 ? <EmptyPanel message="Tasks assigned to your team will appear here." /> : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead><tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-wider text-slate-400"><th className="px-4 py-3 sm:px-5">Task</th><th className="px-3 py-3">Project</th><th className="px-3 py-3">Assignee</th><th className="px-3 py-3">Priority</th><th className="px-3 py-3">Due</th><th className="px-3 py-3">Status</th><th className="px-4 py-3 text-right">Details</th></tr></thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
            {tasks.slice(0, 6).map((task) => {
              const overdue = task.due < today && task.status !== "Done";
              return (
                <tr key={task.id} onClick={() => onSelectTask(task)} className="group cursor-pointer transition-colors hover:bg-slate-50">
                  <td className="max-w-[210px] px-4 py-3.5 sm:px-5"><span className="block truncate font-semibold text-slate-900 group-hover:text-blue-700">{task.title}</span></td>
                  <td className="max-w-[140px] truncate px-3 py-3.5">{task.project}</td>
                  <td className="max-w-[130px] truncate px-3 py-3.5">{task.assignee || "Unassigned"}</td>
                  <td className="px-3 py-3.5"><PriorityBadge priority={task.priority} /></td>
                  <td className={`whitespace-nowrap px-3 py-3.5 ${overdue ? "font-semibold text-rose-600" : ""}`}>{task.due || "—"}{overdue && <span className="block text-[10px]">Overdue</span>}</td>
                  <td className="px-3 py-3.5" onClick={(event) => event.stopPropagation()}><select aria-label={`Update ${task.title} status`} value={task.status} onChange={(event) => onUpdateTask(task.id, { status: event.target.value })} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"><option>To Do</option><option>In Progress</option><option>In Review</option><option>Done</option></select></td>
                  <td className="px-4 py-3.5 text-right" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => onSelectTask(task)} aria-label={`View ${task.title}`} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-700"><Eye className="h-4 w-4" /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

const TeamProgress = ({ teamMembers }) => (
  <section className={`${panelClass} p-5`}>
    <div className="mb-4 flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Users className="h-4 w-4 text-blue-600" />Team progress</h2><Link to="/manager/team" className="text-xs font-semibold text-blue-600">View all</Link></div>
    {teamMembers.length === 0 ? <p className="text-xs text-slate-500">Team members will appear here.</p> : (
      <ul className="space-y-4">{teamMembers.slice(0, 4).map((member) => {
        const total = member.assignedTasks || 0;
        const completed = member.completedTasks || 0;
        const percent = total ? Math.min(100, Math.round((completed / total) * 100)) : 0;
        return <li key={member.id}>
          <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
            <span className="flex min-w-0 items-center gap-2">{member.avatar ? <img src={member.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /> : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700">{member.name?.slice(0, 2).toUpperCase()}</span>}<span className="truncate font-semibold text-slate-800">{member.name}</span></span>
            <span className="shrink-0 text-[11px] text-slate-500">{completed}/{total} · {percent}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600" style={{ width: `${percent}%` }} /></div>
        </li>;
      })}</ul>
    )}
  </section>
);

const UpcomingDeadlines = ({ tasks, today, onSelectTask }) => (
  <section className={`${panelClass} p-5`}>
    <div className="mb-4 flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Clock className="h-4 w-4 text-blue-600" />Upcoming deadlines</h2><span className="text-[10px] font-medium text-slate-400">Nearest first</span></div>
    {tasks.length === 0 ? <p className="text-xs text-slate-500">No open deadlines at the moment.</p> : (
      <ul className="space-y-2.5">{tasks.map((task) => {
        const overdue = task.due < today;
        return <li key={task.id}><button type="button" onClick={() => onSelectTask(task)} className={`w-full rounded-xl border p-3 text-left transition-colors ${overdue ? "border-rose-200 bg-rose-50/60 hover:bg-rose-50" : "border-slate-100 bg-slate-50/70 hover:bg-slate-100"}`}>
          <span className="flex items-start justify-between gap-2"><span className="line-clamp-1 text-xs font-bold text-slate-800">{task.title}</span><PriorityBadge priority={task.priority} /></span>
          <span className="mt-2 flex items-center justify-between gap-2 text-[10px]"><span className="truncate text-slate-500">{task.assignee || "Unassigned"}</span><span className={`flex shrink-0 items-center gap-1 font-semibold ${overdue ? "text-rose-600" : "text-slate-600"}`}><Calendar className="h-3 w-3" />{overdue ? "Overdue · " : ""}{task.due || "No date"}</span></span>
        </button></li>;
      })}</ul>
    )}
  </section>
);

const EmptyPanel = ({ message }) => <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center text-xs text-slate-500">{message}</div>;

export const ManagerDashboardSections = ({ projects, tasks, teamMembers, stats, today, upcomingDeadlines, onSelectTask, onUpdateTask, onSelectProject }) => (
  <div className="space-y-6 sm:space-y-7">
    <DashboardMetrics stats={stats} />
    <ProjectOverview projects={projects} tasks={tasks} onSelectProject={onSelectProject} />
    <div className="grid grid-cols-1 items-start gap-5 2xl:grid-cols-3">
      <div className="min-w-0 2xl:col-span-2"><RecentTasks tasks={tasks} today={today} onSelectTask={onSelectTask} onUpdateTask={onUpdateTask} /></div>
      <aside className="space-y-5"><TeamProgress teamMembers={teamMembers} /><UpcomingDeadlines tasks={upcomingDeadlines} today={today} onSelectTask={onSelectTask} /></aside>
    </div>
  </div>
);

export const ManagerDashboardSkeleton = () => (
  <div className="space-y-5" aria-label="Loading manager dashboard" aria-busy="true">
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">{[0, 1, 2, 3, 4].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl border border-slate-100 bg-white" />)}</div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-2xl bg-slate-100" />)}</div>
    <div className="h-80 animate-pulse rounded-2xl bg-slate-100" />
  </div>
);
