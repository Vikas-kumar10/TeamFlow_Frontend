import { AlertCircle, CheckCircle2, CheckSquare, Clock } from "lucide-react";
import { StatCard } from "../../../components/common/StatCard";

export const DashboardMetrics = ({ stats }) => (
  <section aria-label="Task summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <StatCard title="My tasks" value={stats.total} icon={CheckSquare} badge="Assigned" color="forest" subtext="Your total assigned workload" />
    <StatCard title="In progress" value={stats.inProgress} icon={Clock} badge="Active" color="gold" subtext="Tasks currently underway" />
    <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} badge={`${stats.total ? Math.round((stats.completed / stats.total) * 100) : 0}% done`} color="forest" subtext="Successfully finished tasks" />
    <StatCard title="Overdue" value={stats.overdue} icon={AlertCircle} badge={stats.overdue > 0 ? "Action needed" : "All clear"} color="rose" subtext={stats.overdue > 0 ? "Deadlines have passed" : "No overdue tasks"} />
  </section>
);
