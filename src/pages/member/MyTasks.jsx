import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { NewTaskModal } from "../../components/modals/NewTaskModal";
import { TaskDetailModal } from "../../components/modals/TaskDetailModal";
import { projectsApi, tasksApi } from "../../services/api";
import { TaskFilters } from "./components/TaskFilters";
import { TaskResults } from "./components/TaskResults";
import { TasksHeader } from "./components/TasksHeader";
import { TasksOverview } from "./components/TasksOverview";
import { TasksLoadingState } from "./components/TasksLoadingState";

export const MyTasks = () => {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [statusTab, setStatusTab] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [sortBy, setSortBy] = useState("due");
  const [viewMode, setViewMode] = useState("list");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const [taskData, projectData] = await Promise.all([
          tasksApi.getTasks(),
          projectsApi.getProjects(),
        ]);
        setTasks(taskData);
        setProjects(projectData);
      } catch (error) {
        console.error("Failed to load tasks", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const today = useMemo(() => {
    const date = new Date();
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return localDate.toISOString().split("T")[0];
  }, []);

  const filteredTasks = useMemo(
    () =>
      tasks
        .filter((task) => {
          const query = searchQuery.toLowerCase();
          const matchesSearch =
            task.title.toLowerCase().includes(query) ||
            task.project.toLowerCase().includes(query) ||
            task.tags?.some((tag) => tag.toLowerCase().includes(query));
          const matchesStatus =
            statusTab === "All" || task.status === statusTab;
          const matchesPriority =
            priorityFilter === "All" || task.priority === priorityFilter;
          const matchesProject =
            projectFilter === "All" || task.project === projectFilter;
          return (
            matchesSearch && matchesStatus && matchesPriority && matchesProject
          );
        })
        .sort((first, second) => {
          if (sortBy === "priority") {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return (
              (priorityOrder[first.priority] || 4) -
              (priorityOrder[second.priority] || 4)
            );
          }
          if (sortBy === "title")
            return first.title.localeCompare(second.title);
          return new Date(first.due) - new Date(second.due);
        }),
    [tasks, searchQuery, statusTab, priorityFilter, projectFilter, sortBy],
  );

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
  };

  const createTask = async (taskData) => {
    const createdTask = await tasksApi.createTask(taskData);
    setTasks((currentTasks) => [createdTask, ...currentTasks]);
  };

  const deleteTask = async (taskId) => {
    setTasks(await tasksApi.deleteTask(taskId));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusTab("All");
    setPriorityFilter("All");
    setProjectFilter("All");
  };

  return (
    <main className="mx-auto max-w-1440px space-y-5 sm:space-y-6">
      <TasksHeader
        viewMode={viewMode}
        onViewChange={setViewMode}
        onCreateTask={() => setIsNewTaskOpen(true)}
      />

      <TasksOverview tasks={tasks} today={today} />

      <TaskFilters
        tasks={tasks}
        statusTab={statusTab}
        onStatusChange={setStatusTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        projectFilter={projectFilter}
        onProjectChange={setProjectFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        projects={projects}
      />

      {loading ? <TasksLoadingState /> : (
        <TaskResults
          tasks={filteredTasks}
          viewMode={viewMode}
          today={today}
          onOpenTask={openTask}
          onUpdateStatus={updateTaskStatus}
          onClearFilters={clearFilters}
        />
      )}

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
    </main>
  );
};
