import React, { useState } from 'react';
import {
  X,
  Calendar,
  FolderKanban,
  Flag,
  CheckCircle2,
  User,
  MessageSquare,
  Send,
  Trash2,
  Edit3,
  Save,
  AlertTriangle,
} from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../common/Badge';

export const ManagerTaskDetailModal = ({
  task,
  isOpen,
  onClose,
  onUpdateTask,
  onDeleteTask,
  teamMembers = [],
  projects = [],
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Editable fields
  const [editTitle, setEditTitle] = useState(task?.title || '');
  const [editDesc, setEditDesc] = useState(task?.description || '');
  const [editAssignee, setEditAssignee] = useState(task?.assignee || '');
  const [editPriority, setEditPriority] = useState(task?.priority || 'Medium');
  const [editDue, setEditDue] = useState(task?.due || '');
  const [editStatus, setEditStatus] = useState(task?.status || 'To Do');

  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      time: '3 hours ago',
      text: 'Working on the revisions right now. Will update before EOD.',
    },
  ]);

  if (!isOpen || !task) return null;

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditDesc(task.description || '');
    setEditAssignee(task.assignee);
    setEditPriority(task.priority);
    setEditDue(task.due);
    setEditStatus(task.status);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdateTask(task.id, {
      title: editTitle,
      description: editDesc,
      assignee: editAssignee,
      priority: editPriority,
      due: editDue,
      status: editStatus,
    });
    setIsEditing(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        time: 'Just now',
        text: newComment.trim(),
      },
    ]);
    setNewComment('');
  };

  const statusOptions = ['To Do', 'In Progress', 'In Review', 'Done'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Manager Task View
            </span>
            <span className="text-xs text-slate-400">ID #{task.id}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {!isEditing && (
              <button
                onClick={handleStartEdit}
                className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                title="Edit task"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Edit Mode vs View Mode */}
          {isEditing ? (
            <div className="space-y-4 p-4 rounded-xl bg-blue-50/40 border border-blue-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">Editing Task Details</h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Reassign Member</label>
                  <select
                    value={editAssignee}
                    onChange={(e) => setEditAssignee(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={editDue}
                    onChange={(e) => setEditDue(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-slate-900 leading-snug">{task.title}</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {task.description || 'No detailed description provided for this task.'}
              </p>
            </div>
          )}

          {/* Quick status pill selector */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-500">Quick Change Status:</span>
            <div className="flex flex-wrap gap-1.5">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onUpdateTask(task.id, { status })}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                    task.status === status
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200/70">
            <div>
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <FolderKanban className="w-3.5 h-3.5" /> Project
              </span>
              <p className="text-sm font-semibold text-slate-800 truncate">{task.project}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5" /> Assignee
              </span>
              <p className="text-sm font-semibold text-blue-700 truncate">{task.assignee}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Flag className="w-3.5 h-3.5" /> Priority
              </span>
              <PriorityBadge priority={task.priority} />
            </div>
            <div>
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5" /> Due Date
              </span>
              <p className="text-sm font-semibold text-slate-800">{task.due}</p>
            </div>
          </div>

          {/* Delete Confirmation Warning */}
          {showDeleteConfirm && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Confirm Task Deletion</span>
              </div>
              <p>
                Are you sure you want to delete <strong>"{task.title}"</strong>? This will remove the task
                from all team dashboards.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onDeleteTask(task.id);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold"
                >
                  Yes, Delete Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 bg-white border border-rose-200 text-slate-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              Activity & Comments ({comments.length})
            </h3>

            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3 text-sm">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-slate-900">{comment.author}</span>
                      <span className="text-[10px] text-slate-400">{comment.time}</span>
                    </div>
                    <p className="text-xs text-slate-600">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-3">
              <input
                type="text"
                placeholder="Post an instruction or review feedback as Manager..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Post
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-100">
          {!showDeleteConfirm && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Task
            </button>
          )}
          <div className="flex-1" />
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

