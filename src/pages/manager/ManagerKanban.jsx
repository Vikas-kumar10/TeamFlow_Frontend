import { useCallback, useEffect, useState } from "react";
import { Kanban, Plus } from "lucide-react";
import { tasksApi, projectsApi, teamApi } from "../../services/api";
import { CreateTaskModal } from "../../components/modals/CreateTaskModal";
import { ManagerTaskDetailModal } from "../../components/modals/ManagerTaskDetailModal";
import { ManagerKanbanBoard } from "./components/ManagerKanbanBoard";

export const ManagerKanban = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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
      console.error("Failed to load manager Kanban board", loadError);
      setError("We couldn't load the board. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const refreshTeam = async () =>
    setTeamMembers(await teamApi.getTeamMembers());

  const handleStatusChange = async (taskId, status) => {
    setUpdatingTaskId(taskId);
    setError("");
    try {
      setTasks(await tasksApi.updateTaskStatus(taskId, status));
      setSelectedTask((current) =>
        current?.id === taskId ? { ...current, status } : current,
      );
      await refreshTeam();
    } catch (updateError) {
      console.error("Failed to update task status", updateError);
      setError("We couldn't update the task. Please try again.");
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleCreateTask = async (taskData) => {
    const created = await tasksApi.createTask(taskData);
    setTasks((current) => [created, ...current]);
    await refreshTeam();
  };

  const handleUpdateTask = async (taskId, updatedFields) => {
    setTasks(await tasksApi.updateTask(taskId, updatedFields));
    setSelectedTask((current) =>
      current?.id === taskId ? { ...current, ...updatedFields } : current,
    );
    await refreshTeam();
  };

  const handleDeleteTask = async (taskId) => {
    setTasks(await tasksApi.deleteTask(taskId));
    setSelectedTask(null);
    await refreshTeam();
  };

  return (
    <main className="mx-auto max-w-[1600px] space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Team workflow
          </p>
          <h1 className="mt-1 flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-slate-900">
            <Kanban className="h-6 w-6 text-blue-600" aria-hidden="true" />{" "}
            Kanban board
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track team tasks by stage and update progress from each card.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 sm:self-auto"
        >
          <Plus className="h-4 w-4" /> Add task
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

      {loading ? (
        <div
          className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2 xl:grid-cols-4"
          aria-label="Loading Kanban board"
          aria-busy="true"
        >
          {[0, 1, 2, 3].map((column) => (
            <div
              key={column}
              className="h-480px animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-5 h-5 w-2/3 rounded bg-slate-200" />
              <div className="space-y-3">
                {[0, 1, 2].map((card) => (
                  <div key={card} className="h-28 rounded-xl bg-white" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ManagerKanbanBoard
          tasks={tasks}
          teamMembers={teamMembers}
          updatingTaskId={updatingTaskId}
          onOpenTask={setSelectedTask}
          onStatusChange={handleStatusChange}
        />
      )}

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
