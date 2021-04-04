import React from "react"
import "css/tailwind.css"
import { AppProvider } from "contexts/AppContext"
import AuthContainer from "components/Auth/AuthContainer"

export default function Auth(props) {
  
   return (
    <div>
        <AppProvider>
          <AuthContainer/>
        </AppProvider>
    </div>
    
  );
}
