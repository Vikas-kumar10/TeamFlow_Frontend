import { tasks as defaultTasks } from "../data/memberDashboard";
import { activitiesApi } from "./activitiesApi";
import { getStored, setStored, wait } from "./storage";

const TASKS_KEY = "teamflow_tasks_data";

// Read all tasks saved in the browser.
async function getTasks() {
  await wait();
  return getStored(TASKS_KEY, defaultTasks);
}

// Change one task's status and record the change in activity.
async function updateTaskStatus(taskId, newStatus) {
  await wait();

  const tasks = getStored(TASKS_KEY, defaultTasks);
  const updatedTasks = tasks.map(function (task) {
    if (task.id === taskId) {
      return { ...task, status: newStatus };
    }
    return task;
  });

  setStored(TASKS_KEY, updatedTasks);

  const changedTask = tasks.find(function (task) {
    return task.id === taskId;
  });

  if (changedTask) {
    activitiesApi.addActivity({
      kind: newStatus === "Done" ? "done" : "status",
      text: `Status changed to ${newStatus} for`,
      subject: changedTask.title,
      project: changedTask.project,
      color: newStatus === "Done"
        ? "bg-emerald-100 text-emerald-600"
        : "bg-amber-100 text-amber-600",
    });
  }

  return updatedTasks;
}

// Update a task's other fields.
async function updateTask(taskId, updatedData) {
  await wait(80);

  const tasks = getStored(TASKS_KEY, defaultTasks);
  const updatedTasks = tasks.map(function (task) {
    if (task.id === taskId) {
      return { ...task, ...updatedData };
    }
    return task;
  });

  setStored(TASKS_KEY, updatedTasks);
  activitiesApi.addActivity({
    kind: "status",
    text: "Task details updated for",
    subject: updatedData.title || "Task",
    project: updatedData.project || "Project",
    color: "bg-blue-100 text-blue-600",
  });

  return updatedTasks;
}

// Make a task, save it, and return it to the page.
async function createTask(taskData) {
  await wait(80);

  const tasks = getStored(TASKS_KEY, defaultTasks);
  const newTask = {
    id: Date.now(),
    title: taskData.title,
    project: taskData.project || "Website Redesign",
    priority: taskData.priority || "Medium",
    due: taskData.due || new Date().toISOString().split("T")[0],
    status: taskData.status || "To Do",
    description: taskData.description || "",
    assignee: taskData.assignee || "Ananya Sharma",
    commentsCount: 0,
    tags: taskData.tags || ["Task"],
  };

  setStored(TASKS_KEY, [newTask, ...tasks]);
  activitiesApi.addActivity({
    kind: "assigned",
    text: `Assigned to ${newTask.assignee}`,
    subject: newTask.title,
    project: newTask.project,
    color: "bg-indigo-100 text-indigo-600",
  });

  return newTask;
}

// Remove a task and record that it was deleted.
async function deleteTask(taskId) {
  await wait(80);

  const tasks = getStored(TASKS_KEY, defaultTasks);
  const deletedTask = tasks.find(function (task) {
    return task.id === taskId;
  });
  const updatedTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });

  setStored(TASKS_KEY, updatedTasks);

  if (deletedTask) {
    activitiesApi.addActivity({
      kind: "status",
      text: "Task was deleted:",
      subject: deletedTask.title,
      project: deletedTask.project,
      color: "bg-rose-100 text-rose-600",
    });
  }

  return updatedTasks;
}

export const tasksApi = {
  getTasks,
  updateTaskStatus,
  updateTask,
  createTask,
  deleteTask,
};
