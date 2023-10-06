import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Stores from "../pages/Stores";
import NewDiscount from "../pages/NewDiscount";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/checksession").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewDiscount user={user} />
          </Route>
          <Route path="/stores">
            <Stores />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
