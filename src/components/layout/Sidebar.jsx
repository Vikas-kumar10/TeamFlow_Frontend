import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Activity as ActivityIcon,
  Bell,
  Settings,
  LogOut,
  X,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  unreadCount = 0,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isCompact = isCollapsed && !isOpen;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/home", icon: LayoutDashboard },
    { name: "My Tasks", path: "/tasks", icon: CheckSquare },
    { name: "My Projects", path: "/projects", icon: FolderKanban },
    { name: "Activity", path: "/activity", icon: ActivityIcon },
    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { name: "Profile & Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-[#18352D]/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        aria-label="Member navigation"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#FDFEFC] border-r border-[#DCE5DC] shadow-[8px_0_24px_rgba(24,53,45,0.04)] transition-all duration-300 ${
          /* Mobile slide-in */
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          /* Desktop collapsed or expanded */
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } w-64`}
      >
        {/* Brand / Logo */}
        <div className="h-76px flex items-center justify-between px-4 border-b border-[#DCE5DC] bg-[#FDFEFC]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#065F46] flex items-center justify-center text-[#D6B45A] shadow-sm shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            {!isCompact && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[#18352D] leading-none">
                  TeamFlow
                </span>
                <span className="text-[10px] font-bold text-[#A1873F] uppercase tracking-wider mt-0.5">
                  Workspace
                </span>
              </div>
            )}
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-1 text-[#64748B] hover:text-[#065F46] rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop collapse toggle button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            className="hidden lg:flex p-1.5 text-[#64748B] hover:text-[#065F46] hover:bg-[#F1F5EF] rounded-lg transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Member pages" className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
          {!isCompact && (
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/home"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? "bg-[#065F46] text-white font-semibold shadow-sm"
                      : "text-[#53665F] hover:bg-[#F1F5EF] hover:text-[#18352D]"
                  } ${isCompact ? "justify-center" : ""}`
                }
                title={isCompact ? item.name : undefined}
                aria-label={isCompact ? `${item.name}${item.badge ? `, ${item.badge} unread` : ""}` : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 transition-colors" />
                {!isCompact && <span className="truncate">{item.name}</span>}

                {/* Badge if any */}
                {item.badge && (
                  <span
                    className={`${
                      isCompact
                        ? "absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"
                        : "ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#D6B45A] text-[#18352D] border border-[#C5A348]"
                    }`}
                  >
                    {!isCompact && item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Quick Demo Switcher to Manager View */}
          <div className="pt-3 mt-3 border-t border-[#DCE5DC]">
            <NavLink
              to="/manager"
              onClick={onClose}
              className={() =>
                `w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#64748B] hover:text-[#065F46] hover:bg-[#EEF5EF] rounded-xl transition-colors ${
                  isCompact ? "justify-center" : ""
                }`
              }
              title={isCompact ? "Open Manager Dashboard" : undefined}
              aria-label="Open Manager Portal"
            >
              <Layers className="w-4 h-4 text-[#A1873F] shrink-0" />
              {!isCompact && <span>Open Manager Portal</span>}
            </NavLink>
          </div>
        </nav>

        {/* Bottom User Profile Section */}
        <div className="p-3 border-t border-[#DCE5DC] bg-[#F8FAF5]">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
              isCompact ? "justify-center" : ""
            }`}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#D6B45A]/30 shrink-0"
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  user?.color || "bg-[#E8F0EA] text-[#065F46]"
                }`}
              >
                {user?.initials || "AS"}
              </div>
            )}

            {!isCompact && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-[#18352D] truncate leading-tight">
                    {user?.name || "Ananya Sharma"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block px-1.5 py-0.5 text-[10px] font-semibold rounded bg-[#E8F0EA] text-[#065F46] border border-[#DCE5DC] leading-normal">
                    {user?.role || "Member"}
                  </span>
                  <p className="text-[11px] text-[#64748B] truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full mt-2 flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors ${
              isCompact ? "justify-center" : ""
            }`}
            title={isCompact ? "Log out" : undefined}
            aria-label="Log out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCompact && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};




