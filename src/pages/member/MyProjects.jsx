import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Search,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { projectsApi, tasksApi } from "../../services/api";
import { ProjectStatusBadge } from "../../components/common/Badge";

export const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [pData, tData] = await Promise.all([
          projectsApi.getProjects(),
          tasksApi.getTasks(),
        ]);
        setProjects(pData);
        setTasks(tData);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All" ? true : p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, search, statusFilter]);

  // Compute tasks per project assigned to Alex
  const getProjectTaskCounts = (projectName) => {
    const projectTasks = tasks.filter((t) => t.project === projectName);
    const completedTasks = projectTasks.filter((t) => t.status === "Done");
    return {
      total: projectTasks.length,
      completed: completedTasks.length,
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Projects and spaces where you have active task assignments
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 placeholder-slate-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="On track">On track</option>
            <option value="In progress">In progress</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const counts = getProjectTaskCounts(project.name);
          return (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                    {project.category || "General"}
                  </span>
                  <ProjectStatusBadge status={project.status} />
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-400">Completion</span>
                    <span className="font-bold text-slate-800">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Metadata row */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      My Tasks
                    </span>
                    <span className="font-bold text-slate-800">
                      {counts.completed} / {counts.total} Done
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      Due Date
                    </span>
                    <span className="font-bold text-slate-800">
                      {project.dueDate || "2026-11-30"}
                    </span>
                  </div>
                </div>

                {/* View Project Tasks Link */}
                <Link
                  to={`/tasks?q=${encodeURIComponent(project.name)}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100/80 rounded-xl transition-colors"
                >
                  View Tasks for this Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

