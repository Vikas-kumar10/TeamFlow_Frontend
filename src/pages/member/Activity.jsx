import React, { useState, useEffect, useMemo } from "react";
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Clock,
  MessageSquare,
  UserPlus,
  Filter,
  Sparkles,
} from "lucide-react";
import { activitiesApi } from "../../services/api";

export const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [filterKind, setFilterKind] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await activitiesApi.getActivities();
        setActivities(data);
      } catch (err) {
        console.error("Failed to load activities", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filterKind === "All") return activities;
    return activities.filter((a) => a.kind === filterKind);
  }, [activities, filterKind]);

  const getKindIcon = (kind) => {
    switch (kind) {
      case "assigned":
        return <UserPlus className="w-4 h-4 text-indigo-600" />;
      case "comment":
        return <MessageSquare className="w-4 h-4 text-sky-600" />;
      case "status":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "done":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <ActivityIcon className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Activity Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time feed of task updates, comments, and project milestones
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <select
            value={filterKind}
            onChange={(e) => setFilterKind(e.target.value)}
            className="text-xs py-2 px-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Activities</option>
            <option value="assigned">Assignments</option>
            <option value="status">Status Changes</option>
            <option value="comment">Comments</option>
            <option value="done">Completed Tasks</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No activity events recorded for this category yet.
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {filtered.map((act) => (
              <div
                key={act.id}
                className="relative flex items-start gap-4 group"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                    act.color || "bg-indigo-100 text-indigo-600"
                  }`}
                >
                  {getKindIcon(act.kind)}
                </div>

                {/* Content */}
                <div className="flex-1 bg-slate-50/70 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <p className="text-xs text-slate-700">
                      <span className="font-semibold text-slate-900">
                        {act.text}
                      </span>{" "}
                      <span className="font-semibold text-indigo-600">
                        "{act.subject}"
                      </span>
                    </p>
                    <span className="text-[11px] text-slate-400 shrink-0">
                      {act.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {act.project && (
                      <span className="text-[10px] font-medium bg-white text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                        {act.project}
                      </span>
                    )}
                    {act.user && (
                      <span className="text-[10px] text-slate-400">
                        By {act.user}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

