import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import { tasksApi, projectsApi, teamApi } from "../../services/api";
import { CreateTaskModal } from "../../components/modals/CreateTaskModal";
import { ManagerTaskDetailModal } from "../../components/modals/ManagerTaskDetailModal";
import { ManagerTasksContent } from "./components/ManagerTasksContent";

const getLocalDate = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
};

export const ManagerTasks = () => {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [statusTab, setStatusTab] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [memberFilter, setMemberFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const today = useMemo(getLocalDate, []);

  useEffect(() => setSearchQuery(queryFromUrl), [queryFromUrl]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [taskData, projectData, memberData] = await Promise.all([
        tasksApi.getTasks(),
        projectsApi.getProjects(),
        teamApi.getTeamMembers(),
      ]);
      setTasks(taskData);
      setProjects(projectData);
      setTeamMembers(memberData);
    } catch (loadError) {
      console.error("Failed to load manager tasks", loadError);
      setError("We couldn't load team tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch = [task.title, task.project, task.assignee].some(
        (value) => (value || "").toLowerCase().includes(query),
      );
      const matchesStatus =
        statusTab === "All" ||
        (statusTab === "Overdue"
          ? task.due < today && task.status !== "Done"
          : task.status === statusTab);
      return (
        matchesSearch &&
        matchesStatus &&
        (projectFilter === "All" || task.project === projectFilter) &&
        (memberFilter === "All" || task.assignee === memberFilter) &&
        (priorityFilter === "All" || task.priority === priorityFilter)
      );
    });
  }, [
    tasks,
    searchQuery,
    statusTab,
    projectFilter,
    memberFilter,
    priorityFilter,
    today,
  ]);

  const handleCreateTask = async (taskData) => {
    setError("");
    try {
      const created = await tasksApi.createTask(taskData);
      setTasks((current) => [created, ...current]);
      setTeamMembers(await teamApi.getTeamMembers());
    } catch (createError) {
      console.error("Failed to create task", createError);
      setError("We couldn't create that task. Please try again.");
    }
  };

  const handleUpdateTask = async (taskId, updatedFields) => {
    setUpdatingTaskId(taskId);
    setError("");
    try {
      setTasks(await tasksApi.updateTask(taskId, updatedFields));
      setSelectedTask((current) =>
        current?.id === taskId ? { ...current, ...updatedFields } : current,
      );
      setTeamMembers(await teamApi.getTeamMembers());
    } catch (updateError) {
      console.error("Failed to update task", updateError);
      setError("We couldn't update that task. Please try again.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setError("");
    try {
      setTasks(await tasksApi.deleteTask(taskId));
      setSelectedTask(null);
      setTeamMembers(await teamApi.getTeamMembers());
    } catch (deleteError) {
      console.error("Failed to delete task", deleteError);
      setError("We couldn't delete that task. Please try again.");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusTab("All");
    setProjectFilter("All");
    setMemberFilter("All");
    setPriorityFilter("All");
  };

  return (
    <main className="mx-auto max-w-1500px space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Team workspace
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            Team tasks
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Assign, prioritize, and track work across your projects.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create task
        </button>
      </header>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={loadData}
            className="self-start font-semibold underline underline-offset-2 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      <ManagerTasksContent
        tasks={filteredTasks}
        allTasks={tasks}
        projects={projects}
        teamMembers={teamMembers}
        loading={loading}
        updatingTaskId={updatingTaskId}
        today={today}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusTab={statusTab}
        onStatusChange={setStatusTab}
        projectFilter={projectFilter}
        onProjectChange={setProjectFilter}
        memberFilter={memberFilter}
        onMemberChange={setMemberFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        onClearFilters={clearFilters}
        onSelectTask={setSelectedTask}
        onUpdateTask={handleUpdateTask}
      />

      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreateTask}
        projects={projects}
        teamMembers={teamMembers}
      />
      <ManagerTaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        teamMembers={teamMembers}
        projects={projects}
      />
    </main>
  );
};
