import React from 'react';

export const StatCard = ({ title, value, icon: Icon, badge, color = 'indigo', subtext }) => {
  const colorMap = {
    forest: {
      bg: 'bg-[#E8F0EA] text-[#065F46]',
      borderHover: 'hover:border-[#D6B45A]/70',
      dot: 'bg-[#065F46]',
    },
    gold: {
      bg: 'bg-[#D6B45A]/15 text-[#8A702F]',
      borderHover: 'hover:border-[#D6B45A]/70',
      dot: 'bg-[#D6B45A]',
    },
    indigo: {
      bg: 'bg-indigo-50 text-indigo-600',
      borderHover: 'hover:border-indigo-200',
      dot: 'bg-indigo-600',
    },
    blue: {
      bg: 'bg-sky-50 text-sky-600',
      borderHover: 'hover:border-sky-200',
      dot: 'bg-sky-600',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-200',
      dot: 'bg-emerald-600',
    },
    rose: {
      bg: 'bg-rose-50 text-rose-600',
      borderHover: 'hover:border-rose-200',
      dot: 'bg-rose-600',
    },
  };

  const current = colorMap[color] || colorMap.indigo;

  return (
    <div
      className={`bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs transition-all duration-200 ${current.borderHover} hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${current.bg}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {badge && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {badge}
          </span>
        )}
      </div>
      {subtext && <p className="mt-1 text-xs text-slate-400">{subtext}</p>}
    </div>
  );
};
