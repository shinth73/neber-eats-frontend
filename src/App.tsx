/** @format */

import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "./apollo";
import { LoggedInRouter } from "./routers/rogged-in-router";
import { LoggedOutRouter } from "./routers/rogged-out-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
