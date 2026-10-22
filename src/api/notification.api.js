const notifications = [
  {
    id: "demo-task-update",
    type: "task",
    title: "Task update",
    message: "A task in your workspace was updated.",
    time: "Just now",
    read: false,
  },
  {
    id: "demo-project-update",
    type: "project",
    title: "Project update",
    message: "Your workspace has a new project update.",
    time: "Today",
    read: false,
  },
];

export const getNotifications = async () => [...notifications];

export const markAsRead = async (id) => {
  const notification = notifications.find((item) => item.id === id);
  if (notification) notification.read = true;
  return [...notifications];
};

export const markAllAsRead = async () => {
  notifications.forEach((notification) => {
    notification.read = true;
  });
  return [...notifications];
};

export const notificationsApi = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
