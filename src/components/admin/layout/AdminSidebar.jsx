import { NavLink, useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
  UserRound,
  X,
  Layers,
  Building2,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const items = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Workspaces", "/admin/workspaces", Building2],
  ["Manage Projects", "/admin/projects", FolderKanban],
  ["Manage Members", "/admin/members", Users],
  ["Manage Tasks", "/admin/tasks", CheckSquare],
  ["Activity Logs", "/admin/activity", Activity],
  ["Notifications", "/admin/notifications", Bell],
  ["Workspace Settings", "/admin/settings", Settings],
  ["Profile", "/admin/profile", UserRound],
];

export const AdminSidebar = ({ isOpen, onClose, unreadCount = 0 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-slate-900 leading-none">
                TeamFlow
              </p>
              <p className="mt-1 text-[10px] text-violet-600 uppercase tracking-wider font-bold">
                Admin workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mx-3 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Current workspace
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800">
            TeamFlow Workspace
          </p>
          <p className="text-[11px] text-slate-500">Single workspace demo</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {items.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${isActive ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`
              }
            >
              <Icon className="w-18px] h-18px]" />
              <span>{label}</span>
              {label === "Notifications" && unreadCount > 0 && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
              {user?.initials || "AD"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {user?.name || "Admin"}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.email}
              </p>
            </div>
            <ShieldCheck className="w-4 h-4 text-violet-500 ml-auto" />
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
