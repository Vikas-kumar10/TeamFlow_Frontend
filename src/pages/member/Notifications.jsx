import { useCallback, useEffect, useMemo, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { notificationsApi } from "../../services/api";
import { NotificationList } from "./components/NotificationList";
import { NotificationsLoading } from "./components/NotificationsLoading";

export const Notifications = () => {
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
      console.error("Failed to load notifications", loadError);
      setError("We couldn't load your notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const filteredNotifications = useMemo(
    () => tab === "all" ? notifications : notifications.filter((notification) => !notification.read),
    [notifications, tab],
  );

  const handleMarkAsRead = async (id) => {
    if (updating || notifications.find((notification) => notification.id === id)?.read) return;
    setUpdating(true);
    try {
      setNotifications(await notificationsApi.markAsRead(id));
    } catch (updateError) {
      console.error("Failed to mark notification as read", updateError);
      setError("We couldn't update that notification. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleMarkAllRead = async () => {
    setUpdating(true);
    try {
      setNotifications(await notificationsApi.markAllAsRead());
    } catch (updateError) {
      console.error("Failed to mark notifications as read", updateError);
      setError("We couldn't update your notifications. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A1873F]">Your workspace</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#18352D]">Notifications</h1>
          <p className="mt-1 text-sm text-[#64748B]">Stay up to date with task updates, mentions, and due dates.</p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={updating}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#DCE5DC] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#065F46] shadow-sm transition-colors hover:bg-[#F1F5EF] disabled:cursor-wait disabled:opacity-60 sm:self-auto"
          >
            <CheckCheck className="h-4 w-4" /> Mark all as read
          </button>
        )}
      </header>

      <section className="space-y-4" aria-label="Notifications">
        <div className="flex gap-1 border-b border-[#DCE5DC]" role="tablist" aria-label="Notification filter">
          {[{ id: "all", label: "All", count: notifications.length }, { id: "unread", label: "Unread", count: unreadCount }].map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-xs font-semibold transition-colors ${tab === item.id ? "border-[#065F46] text-[#065F46]" : "border-transparent text-[#64748B] hover:text-[#18352D]"}`}
            >
              {item.label}<span className={`rounded-full px-2 py-0.5 text-[10px] ${tab === item.id ? "bg-[#D6B45A]/20 text-[#065F46]" : "bg-[#E8F0EA] text-[#64748B]"}`}>{item.count}</span>
            </button>
          ))}
        </div>

        {error && (
          <div role="alert" className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 sm:flex-row sm:items-center sm:justify-between">
            <span>{error}</span>
            <button type="button" onClick={loadNotifications} className="self-start font-semibold underline underline-offset-2 sm:self-auto">Try again</button>
          </div>
        )}

        {loading ? (
          <NotificationsLoading />
        ) : (
          <NotificationList
            notifications={filteredNotifications}
            filter={tab}
            updating={updating}
            onMarkAsRead={handleMarkAsRead}
          />
        )}
      </section>
    </main>
  );
};
