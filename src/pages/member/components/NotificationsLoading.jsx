export const NotificationsLoading = () => (
  <section className="space-y-3 rounded-2xl border border-[#DCE5DC] bg-white p-4 shadow-sm sm:p-5" aria-label="Loading notifications" aria-busy="true">
    {[0, 1, 2, 3].map((row) => (
      <div key={row} className="flex animate-pulse items-start gap-3.5 rounded-xl p-2">
        <div className="h-10 w-10 shrink-0 rounded-xl bg-[#E8F0EA]" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3 w-1/3 rounded bg-[#E8F0EA]" />
          <div className="h-3 w-4/5 rounded bg-[#F1F5EF]" />
        </div>
      </div>
    ))}
  </section>
);
