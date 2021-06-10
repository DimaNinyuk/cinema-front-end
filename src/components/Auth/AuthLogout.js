import React, { useContext } from "react";
import { AppContext } from "contexts/AppContext";
import AuthMenu from "./AuthMenu";

const AuthLogout = () => {
  const appContext = useContext(AppContext);
  const { userName, logout,authStatus } = appContext;
  return (
          <button
            onClick={() => logout()}
          >
            Logout
          </button>
  );
};

export default AuthLogout;
