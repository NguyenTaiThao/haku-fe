import { valueAuth } from "common/Type/authType";
import React, { useState, useEffect, createContext, useContext } from "react";
// import Cookies from 'js-cookie';
import { useAPI } from "../api/api";
import Loading from "../components/Loading";
//-------------------------------------

const defaultValue: valueAuth = {
  admin: null,
  updateAdminToken: () => {},
  updateAdmin: () => {},
  clear: () => {},
  revalidate: () => {},
};

export const AuthContext = createContext<valueAuth>(defaultValue);

/**
 * Restore auth user from access_token is persisted in localStorage.
 *
 * TODO: handle refresh token in here.
 */
const AuthProvider = React.memo((props) => {
  const [admin, setAdmin] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const api = useAPI();

  const updateAdminToken = async (token: string, remember?: any) => {
    if (remember) {
      localStorage.setItem("user-token", token);
    } else {
      // Cookies.set('user-token', token);
      localStorage.setItem("user-token", token);
    }
  };

  const updateAdmin = async (data: any) => {
    setAdmin(data);
  };

  const clear = async () => {
    localStorage.removeItem("user-token");
    // Cookies.remove('user-token');
    setAdmin(null);
  };

  const revalidate = async () => {
    getUserInfo();
  };

  const value: valueAuth = {
    admin,
    updateAdminToken,
    updateAdmin,
    clear,
    revalidate,
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem("user-token");
    if (token) {
      try {
        const res = await api.fetcher("get", "/me");
        setAdmin(res);
      } catch (error) {
        setAdmin(null);
        localStorage.removeItem("user-token");
      }
    } else {
      setAdmin(null);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!loaded) {
    return <Loading />;
  }

  return <AuthContext.Provider value={value as valueAuth} {...props} />;
});

export default AuthProvider;
