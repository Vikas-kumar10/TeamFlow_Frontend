import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { notificationsApi } from '../../api/notification.api';

export const MemberLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('teamflow_sidebar_collapsed') === 'true';
  });
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const notifs = await notificationsApi.getNotifications();
        setNotifications(notifs);
      } catch (err) {
        console.error('Failed to load notifications', err);
      }
    };
    loadNotifications();
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('teamflow_sidebar_collapsed', String(next));
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
      {/* Sidebar */}
      <Sidebar
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
        {/* Top Navbar */}
        <Navbar
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          unreadCount={unreadCount}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
        />

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
