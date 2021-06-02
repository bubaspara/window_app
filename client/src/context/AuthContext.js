import React from "react";

export const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState(() =>
    document.cookie ? true : false
  );

  const logout = () => {
    fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAuthState(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const value = {
    logout,
    authState,
    setAuthState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
