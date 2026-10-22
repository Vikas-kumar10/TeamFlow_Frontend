import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Activity as ActivityIcon,
  Bell,
  Building2,
  CheckCheck,
  Plus,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  activitiesApi,
  projectsApi,
  tasksApi,
  teamApi,
} from "../../services/api";
import { notificationsApi } from "../../api/notification.api";
import { useAuth } from "../../context/AuthContext";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";

const titles = {
  workspaces: "Workspaces",
  projects: "Manage Projects",
  members: "Manage Members",
  tasks: "Manage Tasks",
  activity: "Activity Logs",
  notifications: "Notifications",
  settings: "Workspace Settings",
  profile: "Admin Profile",
};
const panel = "rounded-2xl bg-white border border-slate-200 shadow-sm";
const inputClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

export const AdminSection = ({ section }) => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [records, setRecords] = useState({
    projects: [],
    tasks: [],
    members: [],
    activities: [],
    notifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  const load = async () => {
    try {
      const [projects, tasks, members, activities, notifications] =
        await Promise.all([
          projectsApi.getProjects(),
          tasksApi.getTasks(),
          teamApi.getTeamMembers(),
          activitiesApi.getActivities(),
          notificationsApi.getNotifications(),
        ]);
      setRecords({
        projects,
        tasks,
        members,
        activities: [...activities].sort(
          (a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0),
        ),
        notifications,
      });
    } catch {
      setError("Could not load this section. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // The state updates happen after the asynchronous service requests resolve.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (section === "members")
      return records.members.filter(
        (m) =>
          (!query || `${m.name} ${m.email}`.toLowerCase().includes(query)) &&
          (roleFilter === "All roles" || m.role === roleFilter),
      );
    if (section === "projects")
      return records.projects.filter(
        (p) =>
          (!query ||
            `${p.name} ${p.description}`.toLowerCase().includes(query)) &&
          (statusFilter === "All statuses" || p.status === statusFilter),
      );
    if (section === "tasks")
      return records.tasks.filter(
        (t) =>
          (!query ||
            `${t.title} ${t.project} ${t.assignee}`
              .toLowerCase()
              .includes(query)) &&
          (statusFilter === "All statuses" ||
            (statusFilter === "Overdue"
              ? t.due < new Date().toISOString().slice(0, 10) &&
                t.status !== "Done"
              : t.status === statusFilter)),
      );
    return [];
  }, [section, records, search, roleFilter, statusFilter]);

  const createProject = async (project) => {
    await projectsApi.createProject(project);
    await load();
  };
  const updateTaskStatus = async (task, status) => {
    await tasksApi.updateTaskStatus(task.id, status);
    await load();
  };
  const markRead = async (id) => {
    await notificationsApi.markAsRead(id);
    await load();
  };
  const markAllRead = async () => {
    await notificationsApi.markAllAsRead();
    await load();
  };
  const queryField = (
    <label className="relative block w-full sm:w-72">
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
      <input
        className={`${inputClass} pl-9 w-full`}
        placeholder="Search by name or title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
  const filter = (value, setValue, options) => (
    <select
      className={inputClass}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {titles[section]}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your TeamFlow workspace and its current demo data.
          </p>
        </div>
        {section === "projects" && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        )}
        {section === "notifications" &&
          records.notifications.some((n) => !n.read) && (
            <button
              onClick={markAllRead}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
      </div>
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs text-blue-800">
        These records come from the browser-based demo data layer. The backend
        currently provides authentication endpoints only.
      </div>
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error}
          <button className="ml-2 underline" onClick={load}>
            Retry
          </button>
        </div>
      )}
      {["members", "projects", "tasks"].includes(section) && (
        <div className="flex flex-col sm:flex-row gap-2">
          {queryField}
          {section === "members" &&
            filter(roleFilter, setRoleFilter, [
              "All roles",
              "Admin",
              "Manager",
              "Member",
            ])}
          {section === "projects" &&
            filter(statusFilter, setStatusFilter, [
              "All statuses",
              ...new Set(records.projects.map((p) => p.status).filter(Boolean)),
            ])}
          {section === "tasks" &&
            filter(statusFilter, setStatusFilter, [
              "All statuses",
              "To Do",
              "In Progress",
              "In Review",
              "Done",
              "Overdue",
            ])}
        </div>
      )}
      {loading ? (
        <div className={`${panel} p-6 text-sm text-slate-500`}>
          Loading {titles[section].toLowerCase()}…
        </div>
      ) : null}

      {!loading && section === "workspaces" && (
        <div className={`${panel} p-6`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900">
                TeamFlow Workspace
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                A single demo workspace for project and team coordination.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <Info label="Owner / Admin" value={user?.name || "Admin"} />
                <Info label="Members" value={records.members.length} />
                <Info label="Projects" value={records.projects.length} />
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && section === "settings" && (
        <div className={`${panel} p-6 max-w-2xl`}>
          <div className="flex items-center gap-3">
            <SettingsIcon />
            <div>
              <h3 className="font-bold text-slate-900">Workspace details</h3>
              <p className="text-xs text-slate-500">
                Settings are read-only until a workspace API is available.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Info label="Workspace name" value="TeamFlow Workspace" />
            <Info
              label="Description"
              value="A shared space for TeamFlow project and team coordination."
            />
            <Info label="Members" value={records.members.length} />
            <Info label="Projects" value={records.projects.length} />
          </div>
          <p className="mt-5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3">
            Missing backend functionality: workspace read/update endpoints
            scoped to the authenticated administrator.
          </p>
        </div>
      )}

      {!loading && section === "profile" && (
        <div className={`${panel} p-6 max-w-2xl`}>
          <div className="flex items-center gap-4">
            <Avatar user={user} />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
            <span className="ml-auto rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              Admin
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <Info label="Role" value="Workspace Administrator" />
            <Info label="Workspace" value="TeamFlow Workspace" />
            <Info label="Department" value={user?.department || "—"} />
            <Info label="Location" value={user?.location || "—"} />
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Profile editing requires a backend profile update endpoint.
          </p>
        </div>
      )}

      {!loading && section === "projects" && (
        <div className={`${panel} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-760px">
              <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
                <tr>
                  {[
                    "Project",
                    "Status",
                    "Tasks",
                    "Progress",
                    "Members",
                    "Deadline",
                  ].map((x) => (
                    <th key={x} className="px-5 py-3">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-sm text-slate-800">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-500 max-w-xs truncate">
                        {p.description}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <Status value={p.status || "Active"} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {p.completed || 0}/{p.tasks || 0}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${p.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-xs">{p.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {p.membersCount || p.members?.length || 0}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {p.dueDate || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <Empty>No projects match your search.</Empty>
            )}
          </div>
          <p className="px-5 pb-4 text-xs text-slate-500">
            Editing and deletion require backend project update/delete
            endpoints.
          </p>
        </div>
      )}

      {!loading && section === "members" && (
        <div className={`${panel} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-760px text-left">
              <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
                <tr>
                  {[
                    "Member",
                    "Role",
                    "Projects",
                    "Assigned Tasks",
                    "Completed",
                    "Joined",
                  ].map((x) => (
                    <th key={x} className="px-5 py-3">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((m) => (
                  <tr key={m.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar user={m} />
                        <div>
                          <p className="font-semibold text-sm text-slate-800">
                            {m.name}
                          </p>
                          <p className="text-xs text-slate-500">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Status value={m.role} />
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {m.projects?.length || 0}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {m.assignedTasks || 0}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      {m.completedTasks || 0}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {m.joinedDate || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <Empty>No members match your search.</Empty>
            )}
          </div>
          <p className="px-5 pb-4 text-xs text-amber-700">
            Role changes, invitations, and removal are disabled because the
            backend has no member-management endpoints. This prevents UI-only
            role escalation.
          </p>
        </div>
      )}

      {!loading && section === "tasks" && (
        <div className={`${panel} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-780px text-left">
              <thead className="bg-slate-50 text-[11px] uppercase text-slate-500">
                <tr>
                  {[
                    "Task",
                    "Project",
                    "Assignee",
                    "Priority",
                    "Due date",
                    "Status",
                  ].map((x) => (
                    <th key={x} className="px-5 py-3">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((t) => {
                  const late =
                    t.due < new Date().toISOString().slice(0, 10) &&
                    t.status !== "Done";
                  return (
                    <tr key={t.id} className={late ? "bg-rose-50/40" : ""}>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-sm text-slate-800">
                          {t.title}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {t.project}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {t.assignee}
                      </td>
                      <td className="px-5 py-4">
                        <Status value={t.priority || "Medium"} />
                      </td>
                      <td
                        className={`px-5 py-4 text-sm ${late ? "font-semibold text-rose-600" : "text-slate-600"}`}
                      >
                        {late && "Overdue · "}
                        {t.due}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          aria-label={`Change status for ${t.title}`}
                          className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
                          value={t.status}
                          onChange={(e) => updateTaskStatus(t, e.target.value)}
                        >
                          {["To Do", "In Progress", "In Review", "Done"].map(
                            (s) => (
                              <option key={s}>{s}</option>
                            ),
                          )}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <Empty>No tasks match your filters.</Empty>
            )}
          </div>
          <p className="px-5 pb-4 text-xs text-slate-500">
            Status updates use the existing browser demo service. Backend task
            management endpoints are not available.
          </p>
        </div>
      )}

      {!loading && section === "activity" && (
        <div className={`${panel} divide-y divide-slate-100`}>
          {records.activities.map((a) => (
            <div key={a.id} className="p-5 flex gap-3">
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ActivityIcon className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-slate-700">
                  <strong>{a.user || "Team member"}</strong> {a.text}{" "}
                  <strong>{a.subject}</strong>
                  {a.project && (
                    <>
                      {" "}
                      in <strong>{a.project}</strong>
                    </>
                  )}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {a.timestamp
                    ? new Date(a.timestamp).toLocaleString()
                    : a.time}
                </p>
              </div>
            </div>
          ))}
          {records.activities.length === 0 && (
            <Empty>No activity records are available.</Empty>
          )}
          <div className="p-4 text-xs text-slate-500">
            Activity shown here comes from the existing demo data layer, not a
            server audit log.
          </div>
        </div>
      )}

      {!loading && section === "notifications" && (
        <div className={`${panel} divide-y divide-slate-100`}>
          {records.notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 flex items-start gap-3 ${n.read ? "" : "bg-blue-50/40"}`}
            >
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {n.title || n.message || "Workspace update"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {n.description || n.body || n.time || ""}
                </p>
              </div>
              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="text-xs text-blue-600 font-semibold"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
          {records.notifications.length === 0 && (
            <Empty>No notifications available.</Empty>
          )}
          <div className="p-4 text-xs text-slate-500">
            Read state is stored in this browser demo. Server notifications are
            not connected.
          </div>
        </div>
      )}

      {!loading &&
        ![
          "workspaces",
          "settings",
          "profile",
          "projects",
          "members",
          "tasks",
          "activity",
          "notifications",
        ].includes(section) && <Empty>This section is not available.</Empty>}
      <CreateProjectModal
        isOpen={creating}
        onClose={() => setCreating(false)}
        onCreated={createProject}
        teamMembers={records.members}
      />
    </div>
  );
};

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
function Avatar({ user }) {
  return user?.avatar ? (
    <img
      src={user.avatar}
      alt=""
      className="w-9 h-9 rounded-full object-cover bg-slate-100"
    />
  ) : (
    <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-bold">
      {user?.initials || "TF"}
    </span>
  );
}
function Status({ value }) {
  const tone = ["Done", "Member"].includes(value)
    ? "bg-emerald-50 text-emerald-700"
    : ["Overdue", "High"].includes(value)
      ? "bg-rose-50 text-rose-700"
      : ["Admin"].includes(value)
        ? "bg-violet-50 text-violet-700"
        : "bg-blue-50 text-blue-700";
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}
    >
      {value}
    </span>
  );
}
function Empty({ children }) {
  return (
    <div className="p-8 text-center text-sm text-slate-500">{children}</div>
  );
}
function SettingsIcon() {
  return <ShieldCheck className="w-6 h-6 text-blue-600" />;
}
