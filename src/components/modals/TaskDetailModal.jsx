import React, { useState } from 'react';
import { X, Calendar, FolderKanban, Flag, CheckCircle2, Clock, MessageSquare, Send, Trash2 } from 'lucide-react';
import { PriorityBadge, StatusBadge } from '../common/Badge';

export const TaskDetailModal = ({ task, isOpen, onClose, onStatusChange, onDelete }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Jamie Vance',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      time: '2 hours ago',
      text: 'Please make sure this aligns with the updated brand guidelines discussed yesterday.'
    }
  ]);

  if (!isOpen || !task) return null;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        author: 'Ananya Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
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
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Task Details
            </span>
            <span className="text-xs text-slate-400">#{task.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{task.title}</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {task.description || 'No detailed description provided for this task.'}
            </p>
          </div>

          {/* Quick status pill selector */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-500">Quick Change Status:</span>
            <div className="flex flex-wrap gap-1.5">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(task.id, status)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                    task.status === status
                      ? 'bg-indigo-600 text-white shadow-xs'
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
              <p className="text-sm font-medium text-slate-800 truncate">{task.project}</p>
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
              <p className="text-sm font-medium text-slate-800">{task.due}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Status
              </span>
              <StatusBadge status={task.status} />
            </div>
          </div>

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
                      <span className="text-xs text-slate-400">{comment.time}</span>
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
                placeholder="Write a comment or note..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Reply
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-50 border-t border-slate-100">
          {onDelete ? (
            <button
              onClick={() => {
                onDelete(task.id);
                onClose();
              }}
              className="text-xs font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Task
            </button>
          ) : (
            <div />
          )}
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

