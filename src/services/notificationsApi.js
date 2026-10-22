import { notifications as defaultNotifications } from "../data/memberDashboard";
import { getStored, setStored, wait } from "./storage";

const NOTIFICATIONS_KEY = "teamflow_notifications_data";

// Read saved notifications.
async function getNotifications() {
  await wait();
  return getStored(NOTIFICATIONS_KEY, defaultNotifications);
}

// Mark one notification as read.
async function markAsRead(notificationId) {
  const notifications = getStored(NOTIFICATIONS_KEY, defaultNotifications);

  const updatedNotifications = notifications.map(function (notification) {
    if (notification.id === notificationId) {
      return { ...notification, read: true };
    }
    return notification;
  });

  setStored(NOTIFICATIONS_KEY, updatedNotifications);
  return updatedNotifications;
}

// Mark every notification as read.
async function markAllAsRead() {
  const notifications = getStored(NOTIFICATIONS_KEY, defaultNotifications);

  const updatedNotifications = notifications.map(function (notification) {
    return { ...notification, read: true };
  });

  setStored(NOTIFICATIONS_KEY, updatedNotifications);
  return updatedNotifications;
}

export const notificationsApi = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
