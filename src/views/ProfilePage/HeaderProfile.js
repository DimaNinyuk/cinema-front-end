/*eslint-disable*/
import React, {useContext} from "react";
import { AppContext } from "contexts/AppContext";
export default function HeaderProfile() {
    const appContext = useContext(AppContext);
    const {getprofile,authStatus,host,userName} = appContext;
    React.useEffect(() => {
      getprofile();
      }, []);
  return (
    <div>
        {userName}
        </div>)
}