import { useEffect, useState } from "react";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  FolderKanban,
  Plus,
  Users,
  ListTodo,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  activitiesApi,
  projectsApi,
  tasksApi,
  teamApi,
} from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";

const cardStyles = [
  "bg-blue-50 text-blue-700",
  "bg-violet-50 text-violet-700",
  "bg-sky-50 text-sky-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-700",
  "bg-rose-50 text-rose-700",
];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    projects: [],
    tasks: [],
    members: [],
    activities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const load = async () => {
    try {
      const [projects, tasks, members, activities] = await Promise.all([
        projectsApi.getProjects(),
        tasksApi.getTasks(),
        teamApi.getTeamMembers(),
        activitiesApi.getActivities(),
      ]);
      setData({ projects, tasks, members, activities });
    } catch {
      setError("Could not load workspace demo data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // The state updates happen after the asynchronous service requests resolve.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const done = data.tasks.filter((task) => task.status === "Done").length;
  const inProgress = data.tasks.filter((task) =>
    ["In Progress", "In Review"].includes(task.status),
  ).length;
  const overdue = data.tasks.filter(
    (task) => task.due < today && task.status !== "Done",
  ).length;
  const stats = [
    ["Total Members", data.members.length, Users],
    ["Total Projects", data.projects.length, FolderKanban],
    ["Total Tasks", data.tasks.length, ListTodo],
    ["Completed Tasks", done, CheckCircle2],
    ["In Progress", inProgress, CircleDashed],
    ["Overdue Tasks", overdue, AlertTriangle],
  ];
  const createProject = async (project) => {
    await projectsApi.createProject(project);
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Workspace overview</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Welcome back, {user?.name || "Admin"}!
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here's an overview of your workspace and team activity.
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs text-blue-800">
        Demo workspace data is stored in this browser. The backend currently
        exposes authentication only; admin changes are not synced to a server.
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error}{" "}
          <button className="ml-2 underline" onClick={load}>
            Retry
          </button>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map(([label]) => (
            <div
              key={label}
              className="h-28 animate-pulse rounded-2xl bg-white border border-slate-200"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {stats.map(([label, value, Icon], i) => (
            <div
              key={label}
              className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  {label}
                </p>
                <span className={`p-2 rounded-xl ${cardStyles[i]}`}>
                  <Icon className="w-4 h-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-5">
        <section className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Projects overview</h3>
              <p className="mt-1 text-xs text-slate-500">
                Progress across this workspace
              </p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-blue-600 flex items-center gap-1"
            >
              View projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="px-5 pb-5 text-sm text-slate-400">
              Loading projects…
            </div>
          ) : data.projects.length === 0 ? (
            <div className="px-5 pb-6 text-sm text-slate-500">
              No projects yet. Create the first workspace project.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-620px">
                <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Project</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Progress</th>
                    <th className="px-5 py-3">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.projects.slice(0, 5).map((project) => (
                    <tr key={project.id}>
                      <td className="px-5 py-3">
                        <p className="text-sm font-semibold text-slate-800">
                          {project.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {project.description}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                          {project.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${project.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600">
                            {project.progress || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-600">
                        {project.dueDate || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <section className="rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Team overview</h3>
              <p className="mt-1 text-xs text-slate-500">
                Workspace members and workload
              </p>
            </div>
            <Link
              to="/admin/members"
              className="text-xs font-semibold text-blue-600"
            >
              View all
            </Link>
          </div>
          <div className="px-5 pb-4 space-y-3">
            {loading ? (
              <p className="text-sm text-slate-400">Loading members…</p>
            ) : (
              data.members.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-slate-800">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {member.role} · {member.assignedTasks || 0} tasks
                    </p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {member.completedTasks || 0} done
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <section className="rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="p-5 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Activity className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900">Recent activity</h3>
          </div>
          <Link
            to="/admin/activity"
            className="text-xs font-semibold text-blue-600"
          >
            View logs
          </Link>
        </div>
        <div className="px-5 pb-5">
          {loading ? (
            <p className="text-sm text-slate-400">Loading activity…</p>
          ) : (
            data.activities.slice(0, 4).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 py-3 border-t border-slate-100"
              >
                <span className="mt-0.5 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.text}{" "}
                    <span className="font-semibold">{activity.subject}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {activity.time || activity.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
          {!loading && data.activities.length === 0 && (
            <p className="text-sm text-slate-500">No activity recorded yet.</p>
          )}
        </div>
      </section>
      <CreateProjectModal
        isOpen={creating}
        onClose={() => setCreating(false)}
        onCreated={createProject}
        teamMembers={data.members}
      />
    </div>
  );
};
