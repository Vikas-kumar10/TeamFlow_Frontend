
import api from "./axios";

const taskBase = (workspaceId, projectId) =>
  `/workspaces/${workspaceId}/projects/${projectId}/tasks`;

export const createTask = (workspaceId, projectId, data) =>
  api.post(taskBase(workspaceId, projectId), data);

export const getTasks = (workspaceId, projectId) =>
  api.get(taskBase(workspaceId, projectId));

export const getTaskById = (workspaceId, projectId, taskId) =>
  api.get(`${taskBase(workspaceId, projectId)}/${taskId}`);

export const updateTask = (workspaceId, projectId, taskId, data) =>
  api.patch(`${taskBase(workspaceId, projectId)}/${taskId}`, data);

export const updateTaskStatus = (
  workspaceId,
  projectId,
  taskId,
  status
) =>
  api.patch(
    `${taskBase(workspaceId, projectId)}/${taskId}/status`,
    { status }
  );

export const deleteTask = (workspaceId, projectId, taskId) =>
  api.delete(`${taskBase(workspaceId, projectId)}/${taskId}`);
