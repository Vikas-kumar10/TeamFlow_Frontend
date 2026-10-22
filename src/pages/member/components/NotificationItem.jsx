import { AlertTriangle, CheckCircle2, FolderKanban, MessageSquare } from "lucide-react";

const icons = {
  comment: { Icon: MessageSquare, color: "text-sky-700", background: "bg-sky-50" },
  warning: { Icon: AlertTriangle, color: "text-rose-700", background: "bg-rose-50" },
  project: { Icon: FolderKanban, color: "text-violet-700", background: "bg-violet-50" },
  task: { Icon: CheckCircle2, color: "text-[#065F46]", background: "bg-[#E8F0EA]" },
};

export const NotificationItem = ({ notification, disabled, onMarkAsRead }) => {
  const { Icon, color, background } = icons[notification.type] || icons.task;
  return (
    <button
      type="button"
      onClick={() => onMarkAsRead(notification.id)}
      disabled={disabled || notification.read}
      aria-label={`${notification.read ? "Read" : "Mark as read"}: ${notification.title}`}
      className={`flex w-full items-start gap-3.5 p-4 text-left transition-colors hover:bg-[#F8FAF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#065F46] sm:p-5 ${notification.read ? "bg-white" : "bg-[#F8FAF5]/70"} disabled:cursor-default`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${background} ${color}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className={`truncate text-xs sm:text-sm ${notification.read ? "font-semibold text-[#18352D]" : "font-bold text-[#18352D]"}`}>{notification.title}</span>
          <span className="shrink-0 text-[11px] text-[#94A3A0]">{notification.time}</span>
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-[#64748B]">{notification.message}</span>
      </span>
      {!notification.read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#065F46]" aria-label="Unread" />}
    </button>
  );
};
