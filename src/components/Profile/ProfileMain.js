import React, { useContext,useEffect } from "react";
import axios from "axios";
import { AppContext } from "contexts/AppContext";

const ProfileMain = (props) => {
  const appContext = useContext(AppContext);
  const {getprofile} = appContext;
  useEffect(() => {
    getprofile();
    }, []);
  return (
    <div className="">
    -----------                               
        Authentication 
    </div>
  );
};

export default ProfileMain;
