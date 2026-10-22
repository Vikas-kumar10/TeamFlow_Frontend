import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCheck } from "lucide-react";
import { notificationsApi } from "../../api/notification.api";
import { ManagerNotificationList } from "./components/ManagerNotificationList";

export const ManagerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setNotifications(await notificationsApi.getNotifications());
    } catch (loadError) {
      console.error("Failed to load manager notifications", loadError);
      setError("We couldn't load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;
  const filteredNotifications = useMemo(
    () =>
      tab === "all"
        ? notifications
        : notifications.filter((notification) => !notification.read),
    [notifications, tab],
  );

  const handleMarkAsRead = async (id) => {
    if (
      updating ||
      notifications.find((notification) => notification.id === id)?.read
    )
      return;
    setUpdating(true);
    setError("");
    try {
      setNotifications(await notificationsApi.markAsRead(id));
    } catch (updateError) {
      console.error("Failed to mark manager notification as read", updateError);
      setError("We couldn't update that notification. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkAllRead = async () => {
    setUpdating(true);
    setError("");
    try {
      setNotifications(await notificationsApi.markAllAsRead());
    } catch (updateError) {
      console.error(
        "Failed to mark manager notifications as read",
        updateError,
      );
      setError("We couldn't update notifications. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Team workspace
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            Manager notifications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Stay on top of deadlines, task reviews, and project updates.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={updating}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50 disabled:cursor-wait disabled:opacity-60 sm:self-auto"
          >
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
      </header>

      <section className="space-y-4" aria-label="Manager notifications">
        <div
          className="flex gap-1 border-b border-slate-200"
          role="tablist"
          aria-label="Notification filter"
        >
          {[
            { id: "all", label: "All", count: notifications.length },
            { id: "unread", label: "Unread", count: unreadCount },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-semibold transition-colors ${tab === item.id ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}
            >
              {item.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${tab === item.id ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={loadNotifications}
              className="self-start font-semibold underline underline-offset-2 sm:self-auto"
            >
              Try again
            </button>
          </div>
        )}

        <ManagerNotificationList
          notifications={filteredNotifications}
          filter={tab}
          loading={loading}
          updating={updating}
          onMarkAsRead={handleMarkAsRead}
        />
      </section>
    </main>
  );
};
