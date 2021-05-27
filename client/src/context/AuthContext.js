import React from "react";

export const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = React.useState(false);

  const validate = async () => {
    await fetch("http://localhost:3001/auth/validate", {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((res) => {
      if (res.ok) {
        setAuthState(true);
      } else {
        setAuthState(false);
      }
    });
  };

  React.useEffect(() => {
    // validate();
  }, []);

  const value = {
    authState,
    setAuthState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
