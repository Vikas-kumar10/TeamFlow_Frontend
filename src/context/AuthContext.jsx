import { createContext, useContext, useState, useEffect } from "react";
import {
  member as defaultMember,
  manager as defaultManager,
} from "../data/memberDashboard";

const AuthContext = createContext(null);

const STORAGE_KEY_USER = "teamflow_active_user";
const STORAGE_KEY_TOKEN = "teamflow_active_token";
const STORAGE_KEY_ACCOUNTS = "teamflow_registered_accounts";
const demoAdmin = {
  id: "usr_admin_01",
  name: "Taylor Brooks",
  role: "Admin",
  email: "admin@teamflow.app",
  initials: "TB",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  title: "Workspace Administrator",
  department: "Operations",
  location: "San Francisco, CA",
  joinedDate: "January 2024",
  color: "bg-violet-100 text-violet-700",
};

export const AuthProvider = ({ children }) => {
  // Require a fresh login whenever the app is opened or reloaded.
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    }
  }, [user, token]);

  /**
   * Login Handler (supports dummy credentials & pre-registered accounts)
   */
  const login = async (email, password) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 200)); // Simulated network latency

    const cleanEmail = (email || "").trim().toLowerCase();

    // Check if user exists in custom registered accounts list
    const registeredUsers = (() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    })();

    const matchedAccount = registeredUsers.find(
      (acc) => acc.email.toLowerCase() === cleanEmail,
    );

    if (cleanEmail === "admin@teamflow.app" && password !== "password123") {
      setLoading(false);
      throw new Error("Invalid admin credentials");
    }

    if (matchedAccount && matchedAccount.password !== password) {
      setLoading(false);
      throw new Error("Invalid credentials");
    }

    let loggedInUser;
    if (cleanEmail === "admin@teamflow.app") {
      loggedInUser = { ...demoAdmin };
    } else if (matchedAccount) {
      loggedInUser = matchedAccount;
    } else if (
      cleanEmail.includes("manager") ||
      cleanEmail === defaultManager.email.toLowerCase()
    ) {
      // Dummy Manager Account
      loggedInUser = { ...defaultManager };
    } else {
      // Dummy Member Account
      loggedInUser = { ...defaultMember };
      if (email && email !== defaultMember.email) {
        loggedInUser.email = email;
      }
    }

    const mockToken = `mock_jwt_${loggedInUser.role.toLowerCase()}_${Date.now()}`;
    setUser(loggedInUser);
    setToken(mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(loggedInUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);

    setLoading(false);
    return { success: true, user: loggedInUser };
  };

  /**
   * Signup Handler (creates account with chosen role)
   */
  const signup = async ({ name, email, password, role = "Member" }) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 200));

    const initials =
      name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "TF";

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role === "Manager" ? "Manager" : "Member",
      initials,
      avatar:
        role === "Manager"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      title:
        role === "Manager" ? "Engineering & Project Manager" : "Team Member",
      department:
        role === "Manager" ? "Product Operations" : "Product & Design",
      location: "San Francisco, CA",
      phone: "+1 (555) 234-5678",
      joinedDate: "Just now",
      color:
        role === "Manager"
          ? "bg-blue-100 text-blue-700"
          : "bg-indigo-100 text-indigo-700",
      bio: `${role} at TeamFlow collaborating on active workspaces.`,
    };

    // Save into registered accounts
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      const accounts = stored ? JSON.parse(stored) : [];
      accounts.push({ ...newUser, password });
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    } catch (err) {
      console.error("Failed to store account", err);
    }

    const mockToken = `mock_jwt_${newUser.role.toLowerCase()}_${Date.now()}`;
    setUser(newUser);
    setToken(mockToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);

    setLoading(false);
    return { success: true, user: newUser };
  };

  /**
   * Role Switcher Helper for Demos
   */
  const switchRole = (targetRole) => {
    const newUser = targetRole === "Manager" ? defaultManager : defaultMember;
    const newToken = `mock_jwt_${targetRole.toLowerCase()}_switch`;
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
    return newUser;
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isManager: user?.role === "Manager",
        isMember: user?.role === "Member",
        loading,
        login,
        signup,
        switchRole,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
