import React from 'react';
import { X, Calendar, FolderKanban, Users, CheckCircle2, Clock, Layers } from 'lucide-react';
import { ProjectStatusBadge, PriorityBadge, StatusBadge } from '../common/Badge';

export const ProjectDetailsModal = ({ project, isOpen, onClose, tasks = [], teamMembers = [] }) => {
  if (!isOpen || !project) return null;

  const projectTasks = tasks.filter((t) => t.project === project.name);
  const completedTasks = projectTasks.filter((t) => t.status === 'Done');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              {project.category || 'Project Space'}
            </span>
            <ProjectStatusBadge status={project.status} />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{project.name}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Progress & Timeline Bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500">Milestone Completion</span>
              <span className="font-bold text-slate-900">{project.progress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>
                Start: <strong>{project.startDate || '2026-09-01'}</strong>
              </span>
              <span>
                Target Deadline: <strong>{project.dueDate || '2026-11-30'}</strong>
              </span>
            </div>
          </div>

          {/* Team Members in Project */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Assigned Team Members ({project.members?.length || 0})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.members &&
                project.members.map((memberName) => {
                  const memberObj = teamMembers.find((m) => m.name === memberName);
                  return (
                    <div
                      key={memberName}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                    >
                      {memberObj?.avatar ? (
                        <img
                          src={memberObj.avatar}
                          alt={memberName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                          {memberName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{memberName}</p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {memberObj?.title || 'Team Member'}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Tasks in Project */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Associated Tasks ({projectTasks.length})
            </h3>
            {projectTasks.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No tasks assigned to this project yet.</p>
            ) : (
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                {projectTasks.map((t) => (
                  <div key={t.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{t.title}</p>
                      <p className="text-[11px] text-slate-500">
                        Assignee: <span className="font-medium text-slate-700">{t.assignee}</span> • Due:{' '}
                        {t.due}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <PriorityBadge priority={t.priority} />
                      <StatusBadge status={t.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
