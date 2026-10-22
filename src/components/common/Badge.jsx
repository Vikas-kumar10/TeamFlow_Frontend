import React from 'react';

export const PriorityBadge = ({ priority }) => {
  const p = (priority || 'Medium').toLowerCase();

  const configs = {
    high: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
    },
    medium: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500',
    },
    low: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
    },
  };

  const current = configs[p] || configs.medium;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`}></span>
      {priority}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const s = (status || 'To Do').toLowerCase();

  const configs = {
    'to do': {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      dot: 'bg-slate-400',
    },
    'in progress': {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500',
    },
    'in review': {
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      dot: 'bg-purple-500',
    },
    done: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dot: 'bg-emerald-500',
    },
  };

  const current = configs[s] || configs['to do'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`}></span>
      {status}
    </span>
  );
};

export const ProjectStatusBadge = ({ status }) => {
  const isTrack = (status || '').toLowerCase().includes('track');
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        isTrack
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-sky-50 text-sky-700 border-sky-200'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isTrack ? 'bg-emerald-500' : 'bg-sky-500'}`}></span>
      {status}
    </span>
  );
};
