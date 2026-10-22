import { useEffect, useMemo } from "react";
import { Mail, X } from "lucide-react";
import { PriorityBadge, StatusBadge } from "../../../components/common/Badge";

const getInitials = (name = "") => name.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "?";

const MemberAvatar = ({ member, size = "h-12 w-12" }) => member.avatar
  ? <img src={member.avatar} alt="" className={`${size} shrink-0 rounded-2xl object-cover ring-2 ring-blue-50`} />
  : <span className={`${size} flex shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-700`} aria-hidden="true">{getInitials(member.name)}</span>;

const MemberCard = ({ member, tasks, today, onSelect }) => {
  const assigned = tasks.filter((task) => task.assignee === member.name);
  const completed = assigned.filter((task) => task.status === "Done").length;
  const overdue = assigned.filter((task) => task.due < today && task.status !== "Done").length;
  const progress = assigned.length ? Math.round((completed / assigned.length) * 100) : 0;
  const projects = member.projects || [];

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div>
        <div className="flex items-start gap-3.5">
          <MemberAvatar member={member} />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">{member.name}</h2>
            <p className="mt-0.5 truncate text-xs font-medium text-blue-700">{member.title || "Team member"}</p>
            {member.email && <a href={`mailto:${member.email}`} className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate text-[11px] text-slate-500 hover:text-blue-700"><Mail className="h-3 w-3 shrink-0" aria-hidden="true" />{member.email}</a>}
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-3">
          <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Projects</span><span className="text-[10px] text-slate-400">{projects.length}</span></div>
          {projects.length ? <div className="flex flex-wrap gap-1.5">{projects.slice(0, 4).map((project) => <span key={project} className="max-w-full truncate rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">{project}</span>)}{projects.length > 4 && <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] text-slate-500">+{projects.length - 4}</span>}</div> : <p className="text-[11px] text-slate-400">No projects assigned</p>}
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
        <div><div className="mb-1.5 flex justify-between text-xs"><span className="font-medium text-slate-500">Task completion</span><span className="font-bold text-slate-800">{progress}%</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center">
          <div><span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">Assigned</span><span className="mt-1 block text-xs font-bold text-slate-800">{assigned.length}</span></div>
          <div><span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">Done</span><span className="mt-1 block text-xs font-bold text-emerald-700">{completed}</span></div>
          <div><span className="block text-[9px] font-semibold uppercase tracking-wide text-slate-400">Overdue</span><span className={`mt-1 block text-xs font-bold ${overdue ? "text-rose-600" : "text-slate-600"}`}>{overdue}</span></div>
        </div>
        <button type="button" onClick={() => onSelect(member)} className="w-full rounded-xl bg-blue-50 py-2.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30">View tasks <span className="text-blue-500">({assigned.length})</span></button>
      </div>
    </article>
  );
};

const MemberTaskDialog = ({ member, tasks, onClose }) => {
  const memberTasks = tasks.filter((task) => task.assignee === member.name);
  const completed = memberTasks.filter((task) => task.status === "Done").length;

  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[2px]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="team-member-dialog-title" className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <header className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3"><MemberAvatar member={member} size="h-10 w-10" /><div className="min-w-0"><h2 id="team-member-dialog-title" className="truncate text-sm font-bold text-slate-900">{member.name}</h2><p className="truncate text-xs text-slate-500">{[member.title, member.department].filter(Boolean).join(" · ") || "Team member"}</p></div></div>
          <button type="button" onClick={onClose} aria-label="Close member tasks" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-5 w-5" /></button>
        </header>
        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-4 sm:p-6">
          <div className="flex items-center justify-between text-xs"><h3 className="font-bold uppercase tracking-wider text-slate-700">Assigned tasks ({memberTasks.length})</h3><span className="text-slate-500">{completed} completed</span></div>
          {memberTasks.length === 0 ? <div className="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center text-xs text-slate-500">No tasks assigned to this member.</div> : (
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
              {memberTasks.map((task) => <li key={task.id} className="flex items-center justify-between gap-3 p-3.5 transition-colors hover:bg-slate-50">
                <div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-900">{task.title}</p><p className="mt-1 truncate text-[11px] text-slate-500">{task.project || "No project"} · Due {task.due || "not set"}</p></div>
                <div className="flex shrink-0 items-center gap-2"><PriorityBadge priority={task.priority} /><StatusBadge status={task.status} /></div>
              </li>)}
            </ul>
          )}
        </div>
        <footer className="flex justify-end border-t border-slate-100 bg-slate-50 px-5 py-3.5"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">Close</button></footer>
      </section>
    </div>
  );
};

export const ManagerTeamContent = ({ members, allMemberCount, tasks, today, search, selectedMember, onSelectMember, onCloseMember }) => (
  <>
    {!members.length ? (
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <h2 className="text-sm font-bold text-slate-900">{allMemberCount && search ? "No matching team members" : "No team members yet"}</h2>
        <p className="mt-1 text-xs text-slate-500">{allMemberCount && search ? "Try another name, role, or email." : "Team members will appear here when they join the workspace."}</p>
      </section>
    ) : (
      <section aria-label="Team members" className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {members.map((member) => <MemberCard key={member.id} member={member} tasks={tasks} today={today} onSelect={onSelectMember} />)}
      </section>
    )}
    {selectedMember && <MemberTaskDialog member={selectedMember} tasks={tasks} onClose={onCloseMember} />}
  </>
);
