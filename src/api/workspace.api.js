
import api from "./axios";

export const createWorkspace = (data) =>
  api.post("/workspaces", data);

export const getMyWorkspaces = () =>
  api.get("/workspaces");

export const getWorkspaceById = (workspaceId) =>
  api.get(`/workspaces/${workspaceId}`);
