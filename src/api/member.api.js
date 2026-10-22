
import api from "./axios";

export const addWorkspaceMember = (workspaceId, data) =>
  api.post(`/workspaces/${workspaceId}/members`, data);

export const getWorkspaceMembers = (workspaceId) =>
  api.get(`/workspaces/${workspaceId}/members`);

export const updateMemberRole = (workspaceId, userId, role) =>
  api.patch(
    `/workspaces/${workspaceId}/members/${userId}/role`,
    { role }
  );

export const removeWorkspaceMember = (workspaceId, userId) =>
  api.delete(`/workspaces/${workspaceId}/members/${userId}`);
