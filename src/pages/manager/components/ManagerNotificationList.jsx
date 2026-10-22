import { AlertTriangle, Bell, CheckCircle2, FolderKanban, MessageSquare } from "lucide-react";

const notificationIcons = {
  comment: { Icon: MessageSquare, color: "text-sky-700", background: "bg-sky-50" },
  warning: { Icon: AlertTriangle, color: "text-rose-700", background: "bg-rose-50" },
  project: { Icon: FolderKanban, color: "text-violet-700", background: "bg-violet-50" },
  task: { Icon: CheckCircle2, color: "text-blue-700", background: "bg-blue-50" },
};

const LoadingState = () => (
  <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5" aria-label="Loading notifications" aria-busy="true">
    {[0, 1, 2, 3].map((item) => <div key={item} className="flex animate-pulse gap-3.5 p-2"><div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50" /><div className="flex-1 space-y-2 pt-1"><div className="h-3 w-1/3 rounded bg-slate-200" /><div className="h-3 w-4/5 rounded bg-slate-100" /></div></div>)}
  </div>
);

export const ManagerNotificationList = ({ notifications, filter, loading, updating, onMarkAsRead }) => {
  if (loading) return <LoadingState />;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm" aria-label="Notification list">
      {notifications.length === 0 ? (
        <div className="px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Bell className="h-6 w-6" aria-hidden="true" /></span>
          <h2 className="mt-3 text-sm font-bold text-slate-900">{filter === "unread" ? "You're all caught up" : "No notifications yet"}</h2>
          <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{filter === "unread" ? "New manager updates will appear here when they need your attention." : "Deadlines, reviews, and project updates will appear here."}</p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {notifications.map((notification) => {
            const { Icon, color, background } = notificationIcons[notification.type] || notificationIcons.task;
            return <li key={notification.id}>
              <button type="button" onClick={() => onMarkAsRead(notification.id)} disabled={updating || notification.read} aria-label={`${notification.read ? "Read" : "Mark as read"}: ${notification.title}`} className={`flex w-full items-start gap-3.5 p-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 sm:p-5 ${notification.read ? "bg-white" : "bg-blue-50/20"} disabled:cursor-default`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${background} ${color}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3"><span className={`truncate text-xs sm:text-sm ${notification.read ? "font-semibold text-slate-900" : "font-bold text-slate-900"}`}>{notification.title}</span><span className="shrink-0 text-[11px] text-slate-400">{notification.time}</span></span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-600">{notification.message}</span>
                </span>
                {!notification.read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" aria-label="Unread" />}
              </button>
            </li>;
          })}
        </ul>
      )}
    </section>
  );
};
