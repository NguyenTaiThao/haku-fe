import React, { useContext, Suspense } from "react";
import { adminPrefix } from "./AdminRoutes";
import { AuthContext } from "../containers/AuthProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../containers/Layout/Layout";
import AppLoading from "../components/Loading";
import Login from "../containers/Auth/Login";
import NoMatch from "containers/NoMatch";

export default function MainRouter() {
  const { admin } = useContext(AuthContext);

  return (
    <Router>
      <Suspense fallback={<AppLoading />}>
        <Switch>
          <Route path={"/login"} exact strict component={Login} />
          <Route path={adminPrefix} component={admin ? Layout : Login} />
        </Switch>
      </Suspense>
    </Router>
  );
}
