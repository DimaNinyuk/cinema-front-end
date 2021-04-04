import React, { useContext} from "react";
import {
  NOT_LOGGED_IN,
  LOG_IN_FORM,
  SIGN_UP_FORM,
  LOGGED_IN,
} from "constants/AuthStatus";
import AuthLogout from "../Auth/AuthLogout";
import ProfileMain from "./ProfileMain";
import AuthNotLoggedIn from "../Auth/AuthNotLoggedIn";
import { AppContext } from "contexts/AppContext";

const ProfileContainer = () => {
  const appContext = useContext(AppContext);
  const { authStatus, errorMessage } = appContext;
  const showLoggedIn = authStatus === LOGGED_IN ? "" : "hidden";

 
  return (
    <div>
      <div className={showLoggedIn}>
            <ProfileMain />
          </div>
          <div className={showLoggedIn}>
            <AuthLogout />
          </div>
    </div>
  );
};

export default ProfileContainer;