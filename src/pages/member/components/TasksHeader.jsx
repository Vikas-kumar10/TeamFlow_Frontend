import { LayoutGrid, List as ListIcon, Plus } from "lucide-react";

export const TasksHeader = ({ viewMode, onViewChange, onCreateTask }) => (
  <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A1873F]">Workspace</p>
      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#18352D]">My tasks</h1>
      <p className="mt-1 text-sm text-[#64748B]">Plan your workload, update progress, and stay ahead of deadlines.</p>
    </div>

    <div className="flex items-center gap-2.5">
      <div className="inline-flex rounded-xl border border-[#DCE5DC] bg-white p-1 shadow-sm" aria-label="Task view mode">
        <button onClick={() => onViewChange("list")} aria-label="List view" aria-pressed={viewMode === "list"} className={`rounded-lg p-2 transition-colors ${viewMode === "list" ? "bg-[#065F46] text-white shadow-sm" : "text-[#64748B] hover:bg-[#F1F5EF] hover:text-[#18352D]"}`}>
          <ListIcon className="h-4 w-4" />
        </button>
        <button onClick={() => onViewChange("grid")} aria-label="Grid view" aria-pressed={viewMode === "grid"} className={`rounded-lg p-2 transition-colors ${viewMode === "grid" ? "bg-[#065F46] text-white shadow-sm" : "text-[#64748B] hover:bg-[#F1F5EF] hover:text-[#18352D]"}`}>
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>
      <button onClick={onCreateTask} className="inline-flex items-center gap-2 rounded-xl bg-[#065F46] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#064E3B] focus:outline-none focus:ring-2 focus:ring-[#D6B45A]/50">
        <Plus className="h-4 w-4 text-[#D6B45A]" /> New task
      </button>
    </div>
  </header>
);
