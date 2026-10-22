export const TasksLoadingState = () => (
  <section className="rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm sm:p-6" aria-label="Loading tasks" aria-busy="true">
    <div className="mb-5 flex items-center justify-between">
      <div className="h-4 w-32 animate-pulse rounded bg-[#E8F0EA]" />
      <div className="h-4 w-16 animate-pulse rounded bg-[#E8F0EA]" />
    </div>
    <div className="space-y-3">
      {[0, 1, 2, 3].map((row) => <div key={row} className="h-14 animate-pulse rounded-xl bg-[#F1F5EF]" />)}
    </div>
  </section>
);
