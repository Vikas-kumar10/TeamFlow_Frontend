
import api from "./axios";

export const createProject = (workspaceId, data) =>
  api.post(`/workspaces/${workspaceId}/projects`, data);

export const getProjects = (workspaceId) =>
  api.get(`/workspaces/${workspaceId}/projects`);

export const getProjectById = (workspaceId, projectId) =>
  api.get(`/workspaces/${workspaceId}/projects/${projectId}`);

export const updateProject = (workspaceId, projectId, data) =>
  api.patch(
    `/workspaces/${workspaceId}/projects/${projectId}`,
    data
  );

export const deleteProject = (workspaceId, projectId) =>
  api.delete(`/workspaces/${workspaceId}/projects/${projectId}`);
