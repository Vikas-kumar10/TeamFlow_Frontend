import { Calendar, Clock, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { PriorityBadge } from "../../../components/common/Badge";

export const DashboardInsights = ({ deadlines, activities, today, onOpenTask, formatDate }) => (
  <aside className="space-y-5">
    <section className="rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-[#18352D]"><Clock className="h-4 w-4 text-[#A1873F]" /> Upcoming deadlines</h2>
        <span className="text-[10px] font-medium text-[#64748B]">Nearest first</span>
      </div>
      {deadlines.length === 0 ? (
        <p className="py-5 text-center text-xs text-[#64748B]">No pending deadlines.</p>
      ) : (
        <div className="space-y-2.5">
          {deadlines.map((task) => {
            const overdue = task.due < today;
            const dueToday = task.due === today;
            return (
              <button key={task.id} onClick={() => onOpenTask(task)} className={`block w-full rounded-xl border p-3.5 text-left transition-colors ${overdue ? "border-rose-200 bg-rose-50/60 hover:bg-rose-50" : dueToday ? "border-[#D6B45A]/50 bg-[#D6B45A]/10 hover:bg-[#D6B45A]/15" : "border-[#E9EEE8] bg-[#F8FAF5] hover:border-[#D6B45A]/60"}`}>
                <span className="flex items-start justify-between gap-2">
                  <span className="line-clamp-1 text-xs font-bold text-[#18352D]">{task.title}</span>
                  <PriorityBadge priority={task.priority} />
                </span>
                <span className="mt-2 flex items-center justify-between gap-2 text-[10px]">
                  <span className="truncate text-[#64748B]">{task.project}</span>
                  <span className={`inline-flex shrink-0 items-center gap-1 font-semibold ${overdue ? "text-rose-600" : dueToday ? "text-[#8A702F]" : "text-[#53665F]"}`}><Calendar className="h-3 w-3" />{overdue ? "Overdue · " : dueToday ? "Due today · " : ""}{formatDate(task.due)}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>

    <section className="rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-[#18352D]">Recent activity</h2>
        <Link to="/activity" className="text-xs font-semibold text-[#065F46] hover:text-[#A1873F]">View all</Link>
      </div>
      {activities.length === 0 ? (
        <p className="py-5 text-center text-xs text-[#64748B]">Your recent updates will appear here.</p>
      ) : (
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#065F46]"><CheckSquare className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-relaxed text-[#53665F]">
                  <span className="font-semibold text-[#18352D]">{activity.text}</span>{" "}
                  <span className="font-medium text-[#065F46]">{activity.subject}</span>
                </p>
                <span className="mt-1 block text-[10px] text-[#94A3A0]">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  </aside>
);
