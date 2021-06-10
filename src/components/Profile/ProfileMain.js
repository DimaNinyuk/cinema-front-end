import React, { useContext,useEffect } from "react";
import axios from "axios";
import { AppContext } from "contexts/AppContext";
import UserProfile from "views/ProfilePage/ProfilePage.js";
import AdminProfile from "views/AdminProfile/AdminProfile.js"

const ProfileMain = (props) => {
  const appContext = useContext(AppContext);
  const {getprofile,userRole, userId} = appContext;
  useEffect(() => {
    getprofile();
    }, []);
    if (userId!==0)
    {if(userRole===1){
      return (
        <div> <AdminProfile></AdminProfile></div>
      );
    }
    else if(userRole===null)return (
      <UserProfile></UserProfile>
    )
    }
    return "";
};

export default ProfileMain;
