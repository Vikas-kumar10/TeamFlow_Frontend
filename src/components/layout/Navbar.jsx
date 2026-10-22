import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  CheckCircle2,
  Settings,
  LogOut,
  User,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onOpenSidebar, unreadCount = 0, notifications = [], onMarkAllRead }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine current page title
  const getPageInfo = () => {
    const normalizedPath = location.pathname.replace(/\/$/, "") || "/home";
    const currentPath = normalizedPath.startsWith("/member/")
      ? normalizedPath.slice("/member".length)
      : normalizedPath === "/member"
        ? "/home"
        : normalizedPath;

    switch (currentPath) {
      case '/':
        return { title: 'Dashboard', crumb: 'Home' };
      case '/home':
        return { title: 'Dashboard', crumb: 'Home' };
      case '/tasks':
        return { title: 'My Tasks', crumb: 'Tasks' };
      case '/projects':
        return { title: 'My Projects', crumb: 'Projects' };
      case '/activity':
        return { title: 'Activity Log', crumb: 'Activity' };
      case '/notifications':
        return { title: 'Notifications', crumb: 'Alerts' };
      case '/settings':
        return { title: 'Profile & Settings', crumb: 'Account' };
      default:
        return { title: 'Workspace', crumb: 'Overview' };
    }
  };

  const { title, crumb } = getPageInfo();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tasks?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-[76px] bg-[#FDFEFC]/90 backdrop-blur-md border-b border-[#DCE5DC] shadow-[0_2px_12px_rgba(24,53,45,0.03)] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 text-[#64748B] hover:text-[#065F46] hover:bg-[#F1F5EF] rounded-xl lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#94A3A0]">
          <Link to="/home" className="font-bold text-[#18352D] hover:text-[#065F46] transition-colors">
            TeamFlow
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#18352D] font-semibold">{crumb}</span>
        </div>

        <h1 className="text-base sm:text-lg font-bold text-[#18352D] tracking-tight sm:hidden">
          {title}
        </h1>
      </div>

      {/* Middle: Quick Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3A0]" />
          <input
            type="text"
            placeholder="Search tasks, projects, or tags... (Press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8FAF5] border border-[#DCE5DC] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D6B45A]/30 focus:border-[#065F46] transition-all text-[#18352D] placeholder-[#94A3A0]"
          />
        </form>
      </div>

      {/* Right: Notification Bell & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-[#64748B] hover:text-[#065F46] hover:bg-[#F1F5EF] rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D6B45A] ring-2 ring-[#FDFEFC]"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#DCE5DC] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-[#F8FAF5] border-b border-[#DCE5DC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#18352D]">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D6B45A]/20 text-[#065F46]">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="text-[11px] font-medium text-[#065F46] hover:text-[#A1873F] transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#DCE5DC]">
                {notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/notifications');
                    }}
                    className={`p-3 text-xs hover:bg-[#F8FAF5] cursor-pointer transition-colors ${
                      !n.read ? 'bg-[#D6B45A]/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#18352D]">{n.title}</span>
                      <span className="text-[10px] text-[#94A3A0]">{n.time}</span>
                    </div>
                    <p className="text-[#53665F] line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-[#F8FAF5] text-center border-t border-[#DCE5DC]">
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-[#065F46] hover:text-[#A1873F] flex items-center justify-center gap-1"
                >
                  View all notifications <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-[#F1F5EF] transition-colors text-left"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#D6B45A]/30"
              />
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  user?.color || 'bg-[#E8F0EA] text-[#065F46]'
                }`}
              >
                {user?.initials || 'AS'}
              </div>
            )}
            <div className="hidden md:block text-left">
              <span className="block text-xs font-bold text-[#18352D] leading-tight">
                {user?.name || 'Ananya Sharma'}
              </span>
              <span className="block text-[10px] text-[#94A3A0] leading-tight">
                {user?.role || 'Member'}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#DCE5DC] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-[#F8FAF5] border-b border-[#DCE5DC]">
                <p className="font-bold text-xs text-[#18352D]">{user?.name}</p>
                <p className="text-[11px] text-[#64748B] truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold bg-[#D6B45A]/20 text-[#065F46] px-2 py-0.5 rounded-md border border-[#D6B45A]/50">
                    {user?.role || 'Member'}
                  </span>
                  <span className="text-[10px] text-[#94A3A0]">TeamFlow Workspace</span>
                </div>
              </div>

              <div className="p-1.5 text-xs">
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[#53665F] hover:bg-[#F1F5EF] rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-[#94A3A0]" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[#53665F] hover:bg-[#F1F5EF] rounded-xl transition-colors"
                >
                  <Settings className="w-4 h-4 text-[#94A3A0]" />
                  <span>Account Settings</span>
                </Link>
                <div className="my-1 border-t border-[#DCE5DC]"></div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-xl transition-colors font-medium text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};




