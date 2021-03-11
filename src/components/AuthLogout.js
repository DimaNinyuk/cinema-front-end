import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import AuthMenu from "./AuthMenu";

const AuthLogout = () => {
  const appContext = useContext(AppContext);
  const { userName, logout } = appContext;
  return (
    <div className="flex w-full rounded ">
      <div className="w-1/2 bg-white py-24 px-24 rounded-l-lg">
        <div className="font-inter_extrabold text-4xl text-blue-500 text-center">
          Logged in as
        </div>
        <div className="font-inter_thin text-3xl text-blue-500 text-center mb-32">
          {userName}
        </div>
        <div className="flex justify-center w-full">
          <button
            className="font-inter_bold hover:bg-blue-500 text-blue-500 hover:text-white 
            text-center rounded py-2 px-10 border border-blue-500 focus:outline-none"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-blue-500 py-24 rounded-r-lg">
        <AuthMenu loggedIn={true} />
      </div>
    </div>
  );
};

export default AuthLogout;
