import { projects as defaultProjects } from "../data/memberDashboard";
import { activitiesApi } from "./activitiesApi";
import { getStored, setStored, wait } from "./storage";

const PROJECTS_KEY = "teamflow_projects_data";

// Read all saved projects.
async function getProjects() {
  await wait();
  return getStored(PROJECTS_KEY, defaultProjects);
}

// Create a project and save it in the browser.
async function createProject(projectData) {
  await wait(80);

  const projects = getStored(PROJECTS_KEY, defaultProjects);
  const today = new Date().toISOString().split("T")[0];

  const newProject = {
    id: Date.now(),
    name: projectData.name,
    description: projectData.description || "",
    color: projectData.color || "indigo",
    progress: 0,
    status: "In progress",
    tasks: 0,
    completed: 0,
    category: projectData.category || "Engineering",
    membersCount: projectData.members ? projectData.members.length : 1,
    startDate: projectData.startDate || today,
    dueDate: projectData.dueDate || "2026-12-31",
    members: projectData.members || ["Marcus Vance"],
  };

  setStored(PROJECTS_KEY, [newProject, ...projects]);

  activitiesApi.addActivity({
    kind: "assigned",
    text: "Created new project",
    subject: newProject.name,
    project: newProject.name,
    color: "bg-indigo-100 text-indigo-600",
  });

  return newProject;
}

export const projectsApi = {
  getProjects,
  createProject,
};
