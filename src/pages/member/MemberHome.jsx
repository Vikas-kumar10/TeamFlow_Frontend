import { Navigate, useLocation } from "react-router-dom";
import { MemberDashboard } from "./MemberDashboard";
import { MyTasks } from "./MyTasks";
import { MyProjects } from "./MyProjects";
import { Activity } from "./Activity";
import { Notifications } from "./Notifications";
import { ProfileSettings } from "./ProfileSettings";
import { MemberLayout } from "../../components/layout/MemberLayout";

export { MemberLayout };

const memberPages = {
  "/home": <MemberDashboard />,
  "/tasks": <MyTasks />,
  "/projects": <MyProjects />,
  "/activity": <Activity />,
  "/notifications": <Notifications />,
  "/settings": <ProfileSettings />,
};

export const MemberHome = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/$/, "") || "/home";
  const memberPath = normalizedPath.startsWith("/member/")
    ? normalizedPath.slice("/member".length)
    : normalizedPath === "/member"
      ? "/home"
      : normalizedPath;

  return <>{memberPages[memberPath] || <Navigate to="/home" replace />}</>;
};
