import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRole, loginPath = '/login' }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // If a specific role is required, verify user's role
  if (allowedRole && user?.role !== allowedRole) {
    if (user?.role === 'Admin') {
      return <Navigate to="/admin" replace />;
    } else if (user?.role === 'Manager') {
      return <Navigate to="/manager" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};
