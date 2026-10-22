import api from "./axios";

export const getProjectActivities = (workspaceId, projectId) =>
  api.get(`/workspaces/${workspaceId}/projects/${projectId}/activities`);
