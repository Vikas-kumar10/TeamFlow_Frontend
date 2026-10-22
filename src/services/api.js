import {
  activities as demoActivities,
  projects as demoProjects,
  tasks as demoTasks,
  teamMembers as demoTeamMembers,
} from "../data/memberDashboard";

let projects = [...demoProjects];
let tasks = [...demoTasks];

const copy = (items) => items.map((item) => ({ ...item }));

export const projectsApi = {
  getProjects: async () => copy(projects),
  createProject: async (project) => {
    const created = {
      ...project,
      id: `project-${Date.now()}`,
      status: project.status || "On track",
      progress: project.progress || 0,
      members: project.members || [],
    };
    projects = [created, ...projects];
    return { ...created };
  },
};

export const tasksApi = {
  getTasks: async () => copy(tasks),
  createTask: async (task) => {
    const created = { ...task, id: `task-${Date.now()}`, status: task.status || "To Do" };
    tasks = [created, ...tasks];
    return { ...created };
  },
  updateTask: async (id, updates) => {
    tasks = tasks.map((task) => task.id === id ? { ...task, ...updates } : task);
    return copy(tasks);
  },
  updateTaskStatus: async (id, status) => {
    tasks = tasks.map((task) => task.id === id ? { ...task, status } : task);
    return copy(tasks);
  },
  deleteTask: async (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    return copy(tasks);
  },
};

export const teamApi = {
  getTeamMembers: async () => copy(demoTeamMembers),
};

export const activitiesApi = {
  getActivities: async () => copy(demoActivities),
};
