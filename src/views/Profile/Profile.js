import React from "react"
import "css/tailwind.css"
import { AppProvider } from "contexts/AppContext"
import ProfileContainer from "components/Profile/ProfileContainer"

export default function Profile(props) {
   return (
    <div>
        <AppProvider>
          <ProfileContainer/>
        </AppProvider>
    </div>
    
  );
}
