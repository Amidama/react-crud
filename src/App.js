import React from "react";
import Navbar from "./Navbar"
import Users from "./Users"
import UserCreate from "./UserCreate"
import UserUpdate from "./UserUpdate"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/create">
            <UserCreate />
          </Route>
          <Route path="/update/:id">
            <UserUpdate />
          </Route>
          <Route path="/">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}