import { Bell } from "lucide-react";
import { NotificationItem } from "./NotificationItem";

export const NotificationList = ({ notifications, filter, updating, onMarkAsRead }) => (
  <section className="overflow-hidden rounded-2xl border border-[#DCE5DC] bg-white shadow-sm" aria-label="Notification list">
    {notifications.length === 0 ? (
      <div className="px-6 py-14 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F0EA] text-[#065F46]">
          <Bell className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-3 text-sm font-bold text-[#18352D]">{filter === "unread" ? "You're all caught up" : "No notifications yet"}</h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#64748B]">
          {filter === "unread" ? "New updates will appear here when they need your attention." : "Task updates, mentions, and reminders will appear here."}
        </p>
      </div>
    ) : (
      <ul className="divide-y divide-[#E9EEE8]">
        {notifications.map((notification) => (
          <li key={notification.id}>
            <NotificationItem notification={notification} disabled={updating} onMarkAsRead={onMarkAsRead} />
          </li>
        ))}
      </ul>
    )}
  </section>
);
