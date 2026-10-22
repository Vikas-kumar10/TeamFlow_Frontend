import { ArrowRight, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectStatusBadge } from "../../../components/common/Badge";

export const ProjectOverview = ({ projects }) => (
  <section className="space-y-4">
    <div className="flex items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-[#18352D]">My projects</h2>
        <p className="mt-1 text-xs text-[#64748B]">Your active collaborative workspaces</p>
      </div>
      <Link to="/projects" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#065F46] hover:text-[#A1873F]">
        View all <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>

    {projects.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-[#DCE5DC] bg-white px-5 py-10 text-center">
        <FolderKanban className="mx-auto h-7 w-7 text-[#A1873F]" />
        <p className="mt-2 text-sm font-semibold text-[#18352D]">No projects yet</p>
        <p className="mt-1 text-xs text-[#64748B]">Projects you join will appear here.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="flex flex-col justify-between rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#D6B45A]/70 hover:shadow-md">
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="rounded-md bg-[#E8F0EA] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#065F46]">{project.category || "Project"}</span>
                <ProjectStatusBadge status={project.status} />
              </div>
              <h3 className="text-sm font-bold text-[#18352D]">{project.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#64748B]">{project.description}</p>
            </div>

            <div className="mt-5 space-y-3 border-t border-[#E9EEE8] pt-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#64748B]">Overall progress</span>
                  <span className="font-bold text-[#18352D]">{project.progress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8F0EA]">
                  <div className="h-full rounded-full bg-[#D6B45A] transition-all duration-500" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span>Tasks <strong className="ml-1 text-[#18352D]">{project.tasks}</strong></span>
                <span>Completed <strong className="ml-1 text-[#065F46]">{project.completed}</strong></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);
