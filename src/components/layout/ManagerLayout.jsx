import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ManagerSidebar } from './ManagerSidebar';
import { ManagerNavbar } from './ManagerNavbar';
import { notificationsApi } from '../../api/notification.api';

export const ManagerLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('teamflow_mgr_sidebar_collapsed') === 'true';
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const notifs = await notificationsApi.getNotifications();
        setNotifications(notifs);
      } catch (err) {
        console.error('Failed to load manager notifications', err);
      }
    };
    loadNotifications();
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('teamflow_mgr_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleMarkAllRead = async () => {
    const updated = await notificationsApi.markAllAsRead();
    setNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F8FAF5] flex">
      {/* Manager Sidebar */}
      <ManagerSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        unreadCount={unreadCount}
      />

      {/* Main Wrapper */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Manager Top Navbar */}
        <ManagerNavbar
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          unreadCount={unreadCount}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
        />

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
