import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { activitiesApi, projectsApi, tasksApi } from "../../services/api";
import { NewTaskModal } from "../../components/modals/NewTaskModal";
import { TaskDetailModal } from "../../components/modals/TaskDetailModal";
import { DashboardInsights } from "./components/DashboardInsights";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { DashboardWelcome } from "./components/DashboardWelcome";
import { ProjectOverview } from "./components/ProjectOverview";
import { UpcomingTasks } from "./components/UpcomingTasks";

export const MemberDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [taskSearch, setTaskSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("due");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [taskData, projectData, activityData] = await Promise.all([
          tasksApi.getTasks(),
          projectsApi.getProjects(),
          activitiesApi.getActivities(),
        ]);
        setTasks(taskData);
        setProjects(projectData);
        setActivities(activityData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    };

    loadDashboardData();
  }, []);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
      completed: tasks.filter((task) => task.status === "Done").length,
      overdue: tasks.filter(
        (task) => task.due < today && task.status !== "Done",
      ).length,
    }),
    [tasks, today],
  );

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((task) => {
          const query = taskSearch.toLowerCase();
          const matchesSearch =
            task.title.toLowerCase().includes(query) ||
            task.project.toLowerCase().includes(query);
          const matchesStatus =
            statusFilter === "All" || task.status === statusFilter;
          return matchesSearch && matchesStatus;
        })
        .sort((first, second) => {
          if (sortBy === "priority") {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return (
              (priorityOrder[first.priority] || 4) -
              (priorityOrder[second.priority] || 4)
            );
          }
          return new Date(first.due) - new Date(second.due);
        }),
    [tasks, taskSearch, statusFilter, sortBy],
  );

  const upcomingDeadlines = useMemo(
    () =>
      tasks
        .filter((task) => task.status !== "Done")
        .sort((first, second) => new Date(first.due) - new Date(second.due))
        .slice(0, 4),
    [tasks],
  );

  const formatDate = (dateValue) => {
    try {
      return new Date(dateValue).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateValue;
    }
  };

  const openTask = (task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const updateTaskStatus = async (taskId, status) => {
    const updatedTasks = await tasksApi.updateTaskStatus(taskId, status);
    setTasks(updatedTasks);
    if (selectedTask?.id === taskId) {
      setSelectedTask((currentTask) => ({ ...currentTask, status }));
    }
    setActivities(await activitiesApi.getActivities());
  };

  const createTask = async (taskData) => {
    const createdTask = await tasksApi.createTask(taskData);
    setTasks((currentTasks) => [createdTask, ...currentTasks]);
    setActivities(await activitiesApi.getActivities());
  };

  const deleteTask = async (taskId) => {
    setTasks(await tasksApi.deleteTask(taskId));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <DashboardWelcome
        user={user}
        inProgressCount={stats.inProgress}
        onCreateTask={() => setIsNewTaskOpen(true)}
      />

      <DashboardMetrics stats={stats} />

      <div className="grid grid-cols-1 items-start gap-6 2xl:grid-cols-3">
        <div className="space-y-7 2xl:col-span-2">
          <UpcomingTasks
            tasks={filteredTasks}
            search={taskSearch}
            onSearchChange={setTaskSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            today={today}
            onOpenTask={openTask}
            onUpdateStatus={updateTaskStatus}
            onResetFilters={() => {
              setTaskSearch("");
              setStatusFilter("All");
            }}
            formatDate={formatDate}
          />
          <ProjectOverview projects={projects} />
        </div>

        <DashboardInsights
          deadlines={upcomingDeadlines}
          activities={activities}
          today={today}
          onOpenTask={openTask}
          formatDate={formatDate}
        />
      </div>

      <TaskDetailModal
        task={selectedTask}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStatusChange={updateTaskStatus}
        onDelete={deleteTask}
      />
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onCreated={createTask}
        projects={projects}
      />
    </div>
  );
};
