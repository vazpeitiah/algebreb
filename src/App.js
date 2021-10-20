import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
/* import ResetPassword from "./components/ResetPassword" */
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid p-4">
        <Route path="/" exact component={HomePage} />
        <Route path="/profile" component={Profile} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/resetpwd" component={ResetPassword} /> */}
      </div>
    </Router>
  );
}

export default App;