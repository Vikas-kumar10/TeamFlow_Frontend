import { Activity, CheckCircle2, Clock, FolderKanban, MessageSquare, UserPlus } from "lucide-react";

const eventStyles = {
  assigned: { Icon: UserPlus, tone: "bg-blue-50 text-blue-700" },
  comment: { Icon: MessageSquare, tone: "bg-sky-50 text-sky-700" },
  status: { Icon: Clock, tone: "bg-amber-50 text-amber-700" },
  done: { Icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-700" },
};

export const ManagerActivityTimeline = ({ activities }) => (
  <ol className="relative space-y-5 before:absolute before:bottom-3 before:left-[17px] before:top-3 before:w-px before:bg-slate-200 sm:space-y-6">
    {activities.map((item) => {
      const { Icon, tone } = eventStyles[item.kind] || { Icon: Activity, tone: "bg-slate-100 text-slate-600" };
      return (
        <li key={item.id} className="relative flex gap-3.5 sm:gap-4">
          <span className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${tone}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <article className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition-colors hover:border-slate-200 sm:p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <p className="min-w-0 text-xs leading-relaxed text-slate-700 sm:text-sm">
                <span className="font-semibold text-slate-900">{item.text}</span>{" "}
                {item.subject && <span className="font-semibold text-blue-700">“{item.subject}”</span>}
              </p>
              <time className="shrink-0 text-[11px] text-slate-400">{item.time}</time>
            </div>
            {(item.project || item.user) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {item.project && <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-600"><FolderKanban className="h-3 w-3" aria-hidden="true" />{item.project}</span>}
                {item.user && <span className="text-[10px] text-slate-500">By {item.user}</span>}
              </div>
            )}
          </article>
        </li>
      );
    })}
  </ol>
);
