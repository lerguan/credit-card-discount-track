import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";

function App() {
  return (
    <>
      <h1>Project Client</h1>
      <div>
        <SignUpForm />
      </div>
    </>
  );
}

export default App;
