import { createContext, useContext, useState, useEffect } from "react";

import { loginUser, registerUser, getCurrentUser } from "../api/auth.api";

const AuthContext = createContext(null);

const STORAGE_KEY_USER = "teamflow_active_user";
const STORAGE_KEY_TOKEN = "teamflow_active_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem(STORAGE_KEY_TOKEN),
  );
  const [loading, setLoading] = useState(true);

  // Restore login after page reload
  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem(STORAGE_KEY_TOKEN);

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        const currentUser = response.user ?? response.data?.user;

        if (!currentUser) {
          throw new Error("Unable to restore user session");
        }

        setUser(currentUser);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
        setToken(savedToken);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY_TOKEN);
        localStorage.removeItem(STORAGE_KEY_USER);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login using backend API
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const data = response.data ?? response;

      const receivedToken = data.token;
      const loggedInUser = data.user;

      if (!receivedToken || !loggedInUser) {
        throw new Error("Invalid login response from server");
      }

      localStorage.setItem(STORAGE_KEY_TOKEN, receivedToken);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(loggedInUser));

      setToken(receivedToken);
      setUser(loggedInUser);

      return { success: true, user: loggedInUser };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  // Register using backend API
  const signup = async ({ name, email, password }) => {
    setLoading(true);

    try {
      const response = await registerUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      const data = response.data ?? response;

      // Automatically log in only if register API returns a token and user.
      if (data.token && data.user) {
        localStorage.setItem(STORAGE_KEY_TOKEN, data.token);
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data.user));

        setToken(data.token);
        setUser(data.user);
      }

      return {
        success: true,
        user: data.user ?? null,
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (updatedData) => {
    setUser((previousUser) => {
      if (!previousUser) return previousUser;

      const updatedUser = {
        ...previousUser,
        ...updatedData,
      };

      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);

    setUser(null);
    setToken(null);
  };

  const role = user?.role?.toLowerCase();

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(user && token),
        isAdmin: role === "admin",
        isManager: role === "manager",
        isMember: role === "member",
        login,
        signup,
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
