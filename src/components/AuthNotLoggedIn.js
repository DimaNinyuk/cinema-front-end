import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AuthMenu from "./AuthMenu";
import Unlock from "../svg/Unlock";

const AuthNotLoggedIn = () => {
  const appContext = useContext(AppContext);
  const {
    userEmail,
    userPassword,
    handleUserEmail,
    handleUserPassword,
    login,
  } = appContext;
  return (
    <div className="md:flex w-full rounded ">
      <div className="md:w-1/2 bg-white py-24 px-12 rounded-t-lg md:rounded-l-lg  md:rounded-r-none">
        
      </div>
      <div className="md:w-1/2 bg-blue-500 py-24 rounded-b-lg md:rounded-r-lg  md:rounded-l-none">
        <AuthMenu loggedIn={false} />
      </div>
    </div>
  );
};

export default AuthNotLoggedIn;
