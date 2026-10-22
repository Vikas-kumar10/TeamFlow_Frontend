import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { MemberHome, MemberLayout } from "./pages/member/MemberHome";

// Manager Components
import { ManagerLayout } from "./components/layout/ManagerLayout";
import { ManagerDashboard } from "./pages/manager/ManagerDashboard";
import { ManagerProjects } from "./pages/manager/ManagerProjects";
import { ManagerTasks } from "./pages/manager/ManagerTasks";
import { ManagerTeam } from "./pages/manager/ManagerTeam";
import { ManagerKanban } from "./pages/manager/ManagerKanban";
import { ManagerActivity } from "./pages/manager/ManagerActivity";
import { ManagerNotifications } from "./pages/manager/ManagerNotifications";
import { ManagerProfile } from "./pages/manager/ManagerProfile";
import { AdminLayout } from "./components/admin/layout/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminSection } from "./pages/admin/AdminSection";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { LandingPage } from "./pages/LandingPage";
import { Features } from "./pages/Features";
import { Workflow } from "./pages/Workflow";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/features"
            element={<Features />}
          />
          <Route
            path="/workflow"
            element={<Workflow />}
          />
          {/* Authentication pages */}
          <Route path="login" element={<Login />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="signup" element={<Signup />} />

          {/* Member Dashboard routes wrapped with MemberLayout */}
          <Route
            element={
              <ProtectedRoute allowedRole="Member">
                <MemberLayout />
              </ProtectedRoute>
            }
          >
            <Route path="*" element={<MemberHome />} />
          </Route>

          {/* Manager Dashboard routes wrapped with ManagerLayout */}
          <Route
            path="manager"
            element={
              <ProtectedRoute allowedRole="Manager">
                <ManagerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ManagerDashboard />} />
            <Route path="projects" element={<ManagerProjects />} />
            <Route path="tasks" element={<ManagerTasks />} />
            <Route path="team" element={<ManagerTeam />} />
            <Route path="kanban" element={<ManagerKanban />} />
            <Route path="activity" element={<ManagerActivity />} />
            <Route path="notifications" element={<ManagerNotifications />} />
            <Route path="profile" element={<ManagerProfile />} />
          </Route>

          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRole="Admin" loginPath="/admin/login">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route
              path="workspaces"
              element={<AdminSection section="workspaces" />}
            />
            <Route
              path="projects"
              element={<AdminSection section="projects" />}
            />
            <Route
              path="members"
              element={<AdminSection section="members" />}
            />
            <Route path="tasks" element={<AdminSection section="tasks" />} />
            <Route
              path="activity"
              element={<AdminSection section="activity" />}
            />
            <Route
              path="notifications"
              element={<AdminSection section="notifications" />}
            />
            <Route
              path="settings"
              element={<AdminSection section="settings" />}
            />
            <Route
              path="profile"
              element={<AdminSection section="profile" />}
            />
          </Route>

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

