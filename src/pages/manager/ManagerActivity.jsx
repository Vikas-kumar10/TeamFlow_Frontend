import { useCallback, useEffect, useMemo, useState } from "react";
import { Activity, Filter } from "lucide-react";
import { activitiesApi } from "../../services/api";
import { ManagerActivityTimeline } from "./components/ManagerActivityTimeline";

export const ManagerActivity = () => {
  const [activities, setActivities] = useState([]);
  const [filterKind, setFilterKind] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setActivities(await activitiesApi.getActivities());
    } catch (loadError) {
      console.error("Failed to load manager activities", loadError);
      setError("We couldn't load the activity log. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const filteredActivities = useMemo(() => {
    const matching =
      filterKind === "All"
        ? activities
        : activities.filter((activity) => activity.kind === filterKind);
    return [...matching].sort((first, second) => {
      const firstTime = Date.parse(first.timestamp || "") || 0;
      const secondTime = Date.parse(second.timestamp || "") || 0;
      return secondTime - firstTime;
    });
  }, [activities, filterKind]);

  return (
    <main className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            Team workspace
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            Activity log
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Follow team assignments, task updates, comments, and milestones.
          </p>
        </div>
        <label className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:self-auto">
          <Filter className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <span className="sr-only">Filter activity</span>
          <select
            value={filterKind}
            onChange={(event) => setFilterKind(event.target.value)}
            className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none"
          >
            <option value="All">All activity</option>
            <option value="assigned">Assignments</option>
            <option value="status">Status changes</option>
            <option value="comment">Comments</option>
            <option value="done">Completed tasks</option>
          </select>
        </label>
      </header>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={loadActivities}
            className="self-start font-semibold underline underline-offset-2 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      <section aria-label="Team activity">
        {loading ? (
          <div
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            aria-label="Loading activity"
            aria-busy="true"
          >
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="flex animate-pulse gap-4">
                <div className="h-9 w-9 shrink-0 rounded-full bg-blue-50" />
                <div className="flex-1 space-y-2 rounded-xl bg-slate-50 p-4">
                  <div className="h-3 w-2/5 rounded bg-slate-200" />
                  <div className="h-3 w-4/5 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Activity className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-sm font-bold text-slate-900">
              {activities.length ? "No matching activity" : "No activity yet"}
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
              {activities.length
                ? "Choose another activity type to see more events."
                : "Team updates will appear here as work moves forward."}
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Recent events
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Latest updates across your team.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                {filteredActivities.length}{" "}
                {filteredActivities.length === 1 ? "event" : "events"}
              </span>
            </div>
            <ManagerActivityTimeline activities={filteredActivities} />
          </div>
        )}
      </section>
    </main>
  );
};
