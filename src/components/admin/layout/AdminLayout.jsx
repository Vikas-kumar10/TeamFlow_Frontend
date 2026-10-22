import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";
import { notificationsApi } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

const pageNames = {
  admin: "Dashboard",
  workspaces: "Workspaces",
  projects: "Manage Projects",
  members: "Manage Members",
  tasks: "Manage Tasks",
  activity: "Activity Logs",
  notifications: "Notifications",
  settings: "Workspace Settings",
  profile: "Profile",
};

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const title = pageNames[location.pathname.split("/")[2] || "admin"];

  useEffect(() => {
    notificationsApi
      .getNotifications()
      .then((items) =>
        setUnreadCount(items.filter((item) => !item.read).length),
      )
      .catch(() => setUnreadCount(0));
  }, [location.pathname]);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/admin/tasks?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        unreadCount={unreadCount}
      />
      <div className="flex-1 min-w-0 lg:pl-64">
        <header className="h-16 sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 sm:px-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <span className="text-lg">☰</span>
            </button>
            <div>
              <p className="text-[11px] text-slate-400">TeamFlow / Admin</p>
              <h1 className="font-bold text-slate-900">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="bg-transparent outline-none text-sm w-36"
              />
            </form>
            <button
              onClick={() => navigate("/admin/notifications")}
              aria-label="Notifications"
              className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/admin/profile")}
              className="flex items-center gap-2 pl-3 border-l border-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center">
                {user?.initials || "AD"}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-slate-800">
                  {user?.name}
                </p>
                <p className="text-[10px] text-slate-500">Administrator</p>
              </div>
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8 max-w-1500px mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
