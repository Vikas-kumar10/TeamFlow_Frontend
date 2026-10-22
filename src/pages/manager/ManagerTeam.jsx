import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Clock, Search, Users } from "lucide-react";
import { teamApi, tasksApi } from "../../services/api";
import { ManagerTeamContent } from "./components/ManagerTeamContent";

const getLocalDate = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
};

export const ManagerTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const today = useMemo(getLocalDate, []);

  const loadTeam = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [members, memberTasks] = await Promise.all([
        teamApi.getTeamMembers(),
        tasksApi.getTasks(),
      ]);
      setTeamMembers(members);
      setTasks(memberTasks);
    } catch (loadError) {
      console.error("Failed to load team data", loadError);
      setError("We couldn't load team data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return teamMembers.filter((member) =>
      [member.name, member.title, member.department, member.email].some(
        (value) => (value || "").toLowerCase().includes(query),
      ),
    );
  }, [teamMembers, search]);

  const stats = useMemo(
    () => ({
      members: teamMembers.length,
      activeTasks: tasks.filter((task) => task.status !== "Done").length,
      completed: tasks.filter((task) => task.status === "Done").length,
      overdue: tasks.filter(
        (task) => task.due < today && task.status !== "Done",
      ).length,
    }),
    [teamMembers.length, tasks, today],
  );

  return (
    <main className="mx-auto max-w-1440px space-y-5 sm:space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
          Team workspace
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
          Team members
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review team workload, task progress, and active assignments.
        </p>
      </header>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={loadTeam}
            className="self-start font-semibold underline underline-offset-2 sm:self-auto"
          >
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-5" aria-label="Loading team" aria-busy="true">
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <section
            aria-label="Team summary"
            className="grid grid-cols-2 gap-3 xl:grid-cols-4"
          >
            <TeamMetric
              label="Team members"
              value={stats.members}
              icon={Users}
              tone="blue"
            />
            <TeamMetric
              label="Active tasks"
              value={stats.activeTasks}
              icon={Clock}
              tone="sky"
            />
            <TeamMetric
              label="Completed tasks"
              value={stats.completed}
              icon={CheckCircle2}
              tone="emerald"
            />
            <TeamMetric
              label="Overdue tasks"
              value={stats.overdue}
              icon={AlertCircle}
              tone="rose"
            />
          </section>
          <label className="relative block">
            <span className="sr-only">Search team members</span>
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, role, or email"
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3.5 text-xs text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </label>
          <ManagerTeamContent
            members={filteredMembers}
            allMemberCount={teamMembers.length}
            tasks={tasks}
            today={today}
            search={search}
            selectedMember={selectedMember}
            onSelectMember={setSelectedMember}
            onCloseMember={() => setSelectedMember(null)}
          />
        </>
      )}
    </main>
  );
};

const tones = {
  blue: "bg-blue-50 text-blue-700",
  sky: "bg-sky-50 text-sky-700",
  emerald: "bg-emerald-50 text-emerald-700",
  rose: "bg-rose-50 text-rose-700",
};

const TeamMetric = ({ label, value, icon: Icon, tone }) => (
  <article className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <div>
      <p className="text-xl font-bold leading-none text-slate-900">{value}</p>
      <p className="mt-1.5 text-[11px] font-medium text-slate-500 sm:text-xs">
        {label}
      </p>
    </div>
  </article>
);
