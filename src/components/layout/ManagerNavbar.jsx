import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  LogOut,
  User,
  ExternalLink,
  ChevronRight,
  ArrowLeftRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ManagerNavbar = ({ onOpenSidebar, unreadCount = 0, notifications = [], onMarkAllRead }) => {
  const { user, logout, switchRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

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
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/manager':
        return { title: 'Manager Overview', crumb: 'Overview' };
      case '/manager/projects':
        return { title: 'Projects Management', crumb: 'Projects' };
      case '/manager/tasks':
        return { title: 'Team Tasks', crumb: 'Tasks' };
      case '/manager/team':
        return { title: 'Team Members', crumb: 'Team' };
      case '/manager/kanban':
        return { title: 'Kanban Board', crumb: 'Kanban' };
      case '/manager/activity':
        return { title: 'Activity Audit Log', crumb: 'Activity' };
      case '/manager/notifications':
        return { title: 'Notifications', crumb: 'Notifications' };
      case '/manager/profile':
        return { title: 'Manager Profile', crumb: 'Profile' };
      default:
        return { title: 'Manager Portal', crumb: 'Overview' };
    }
  };

  const { title, crumb } = getPageInfo();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/manager/tasks?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-[76px] bg-[#FDFEFC]/90 backdrop-blur-md border-b border-[#DCE5DC] shadow-[0_2px_12px_rgba(24,53,45,0.03)] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          type="button"
          className="p-2 text-[#64748B] hover:text-[#065F46] hover:bg-[#F1F5EF] rounded-xl lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Link to="/manager" className="font-bold text-[#18352D] hover:text-[#065F46] transition-colors">
            TeamFlow
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#18352D] font-semibold">{crumb}</span>
        </div>

        <h1 className="text-base sm:text-lg font-bold text-[#18352D] tracking-tight sm:hidden">
          {title}
        </h1>
      </div>

      {/* Middle: Search Field */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3A0]" />
          <input
            type="text"
            placeholder="Search team tasks... (Press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search team tasks"
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8FAF5] border border-[#DCE5DC] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#D6B45A]/30 focus:border-[#065F46] transition-all text-[#18352D] placeholder-[#94A3A0]"
          />
        </form>
      </div>

      {/* Right: Notifications & Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => { setShowNotifications((open) => !open); setShowProfileMenu(false); }}
            aria-expanded={showNotifications}
            aria-haspopup="true"
            className="relative p-2 text-[#64748B] hover:text-[#065F46] hover:bg-[#F1F5EF] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065F46]/30"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D6B45A] ring-2 ring-[#FDFEFC]"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[min(24rem,calc(100vw-1.5rem))] bg-white rounded-2xl shadow-xl border border-[#DCE5DC] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-[#F8FAF5] border-b border-[#DCE5DC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#18352D]">Manager Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D6B45A]/20 text-[#065F46]">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllRead}
                    className="text-[11px] font-semibold text-[#065F46] hover:text-[#A1873F] transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#DCE5DC]">
                {notifications.length === 0 ? (
                  <p className="px-4 py-8 text-center text-xs text-[#64748B]">No notifications yet.</p>
                ) : notifications.slice(0, 4).map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/manager/notifications');
                    }}
                    className={`block w-full p-3 text-left text-xs hover:bg-[#F8FAF5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#065F46] ${
                      !n.read ? 'bg-[#D6B45A]/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#18352D]">{n.title}</span>
                      <span className="text-[10px] text-[#94A3A0]">{n.time}</span>
                    </div>
                    <p className="text-[#53665F] line-clamp-2">{n.message}</p>
                  </button>
                ))}
              </div>

              <div className="p-2.5 bg-[#F8FAF5] text-center border-t border-[#DCE5DC]">
                <Link
                  to="/manager/notifications"
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
            type="button"
            onClick={() => { setShowProfileMenu((open) => !open); setShowNotifications(false); }}
            aria-expanded={showProfileMenu}
            aria-haspopup="true"
            aria-label="Open manager profile menu"
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-[#F1F5EF] transition-colors text-left"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || 'Manager'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#D6B45A]/30"
              />
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  user?.color || 'bg-[#E8F0EA] text-[#065F46]'
                }`}
              >
                {user?.initials || 'MV'}
              </div>
            )}
            <div className="hidden md:block text-left">
              <span className="block text-xs font-bold text-[#18352D] leading-tight">
                {user?.name || 'Marcus Vance'}
              </span>
              <span className="block text-[10px] text-[#A1873F] font-semibold leading-tight">
                {user?.role || 'Manager'}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#DCE5DC] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-[#F8FAF5] border-b border-[#DCE5DC]">
                <p className="font-bold text-xs text-[#18352D]">{user?.name || 'Marcus Vance'}</p>
                <p className="text-[11px] text-[#64748B] truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold bg-[#D6B45A]/20 text-[#065F46] px-2 py-0.5 rounded-md border border-[#D6B45A]/50">
                    {user?.role || 'Manager'}
                  </span>
                  <span className="text-[10px] text-[#94A3A0]">TeamFlow Workspace</span>
                </div>
              </div>

              <div className="p-1.5 text-xs">
                <Link
                  to="/manager/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-[#53665F] hover:bg-[#F1F5EF] rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-[#A1873F]" />
                  <span>Manager Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    switchRole('Member');
                    navigate('/home');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[#53665F] hover:bg-[#F1F5EF] rounded-xl transition-colors text-left"
                >
                  <ArrowLeftRight className="w-4 h-4 text-[#A1873F]" />
                  <span>Switch to Member View</span>
                </button>

                <div className="my-1 border-t border-[#DCE5DC]"></div>

                <button
                  type="button"
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
