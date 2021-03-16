import React from "react"
import "./css/tailwind.css"
import { AppProvider } from "./contexts/AppContext"
import AuthContainer from "./components/AuthContainer"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./components/main/Index";

function App() {
  return (
    <div className="flex w-full justify-center bg-blue-200 pt-16 pb-32">
      <div className="lg:flex w-11/12 lg:w-3/4 xl:w-3/5">
        <AppProvider>
          <AuthContainer />
        </AppProvider>
      </div>
      <Router>
    <div>
      <Route path="/index"><Index/></Route>
      
    </div>
  </Router>
    </div>
    
  )
}

export default App