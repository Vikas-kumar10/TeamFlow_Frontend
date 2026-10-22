import api from "./axios";

const commentsBase = (workspaceId, projectId, taskId) =>
  `/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}/comments`;

export const getTaskComments = (workspaceId, projectId, taskId) =>
  api.get(commentsBase(workspaceId, projectId, taskId));

export const createComment = (workspaceId, projectId, taskId, content) =>
  api.post(commentsBase(workspaceId, projectId, taskId), { content });

export const updateComment = (
  workspaceId,
  projectId,
  taskId,
  commentId,
  content,
) =>
  api.patch(`${commentsBase(workspaceId, projectId, taskId)}/${commentId}`, {
    content,
  });

export const deleteComment = (workspaceId, projectId, taskId, commentId) =>
  api.delete(`${commentsBase(workspaceId, projectId, taskId)}/${commentId}`);
