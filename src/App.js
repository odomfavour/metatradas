import React from "react";
import { Route, Routes } from "react-router";
import Activities from "./screens/Activities/Activities";

import Home from "./screens/Index"
import Login from "./screens/Login/Login";
import Settings from "./screens/Settings/Settings";
import SignUp from "./screens/SignUp/SignUp";
import Subscription from "./screens/Subscription/Subscription";
import Teams from "./screens/Teams/Teams";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/activities" element={<Activities/>}/>
      <Route path="/subscription" element={<Subscription/>}/>
      <Route path="/teams" element={<Teams/>}/>
      <Route path="/settings" element={<Settings/>}/>
    </Routes>
  );
}

export default App;
