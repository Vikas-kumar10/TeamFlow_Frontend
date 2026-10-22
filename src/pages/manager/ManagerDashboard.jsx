import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { projectsApi, tasksApi, teamApi } from "../../services/api";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import { CreateTaskModal } from "../../components/modals/CreateTaskModal";
import { ManagerTaskDetailModal } from "../../components/modals/ManagerTaskDetailModal";
import { ProjectDetailsModal } from "../../components/modals/ProjectDetailsModal";
import {
  ManagerDashboardHeader,
  ManagerDashboardSections,
  ManagerDashboardSkeleton,
} from "./components/ManagerDashboardSections";

const getLocalDate = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
};

export const ManagerDashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const today = useMemo(getLocalDate, []);

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
      console.error("Failed to load manager dashboard data", loadError);
      setError("We couldn't load the dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = useMemo(
    () => ({
      totalProjects: projects.length,
      totalTasks: tasks.length,
      inProgress: tasks.filter(
        (task) => task.status === "In Progress" || task.status === "In Review",
      ).length,
      completed: tasks.filter((task) => task.status === "Done").length,
      overdue: tasks.filter(
        (task) => task.due < today && task.status !== "Done",
      ).length,
    }),
    [projects, tasks, today],
  );

  const upcomingDeadlines = useMemo(
    () =>
      tasks
        .filter((task) => task.status !== "Done")
        .sort((first, second) => new Date(first.due) - new Date(second.due))
        .slice(0, 5),
    [tasks],
  );

  const refreshTeam = async () =>
    setTeamMembers(await teamApi.getTeamMembers());

  const handleCreateProject = async (projectData) => {
    const created = await projectsApi.createProject(projectData);
    setProjects((current) => [created, ...current]);
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
    <main className="mx-auto max-w-1500px space-y-5 sm:space-y-6">
      <ManagerDashboardHeader
        name={user?.name || "Manager"}
        onCreateProject={() => setIsCreateProjectOpen(true)}
        onCreateTask={() => setIsCreateTaskOpen(true)}
      />

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
        <ManagerDashboardSkeleton />
      ) : (
        <ManagerDashboardSections
          projects={projects}
          tasks={tasks}
          teamMembers={teamMembers}
          stats={stats}
          today={today}
          upcomingDeadlines={upcomingDeadlines}
          onSelectTask={setSelectedTask}
          onUpdateTask={handleUpdateTask}
          onSelectProject={setSelectedProject}
        />
      )}

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onCreated={handleCreateProject}
        teamMembers={teamMembers}
      />
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
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
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        tasks={tasks}
        teamMembers={teamMembers}
      />
    </main>
  );
};
