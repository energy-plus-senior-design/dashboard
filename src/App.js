import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Layout from "./components/Layout"
import PerformanceDashboard from "./PerformanceDashboard"
import RealtimeDashboard from "./RealtimeDashboard"

export default function App() {
  return (
    <Router>
      <Redirect exact from="/" to="models" />
      <Layout>
        <Switch>
          <Route path="/models">
            <PerformanceDashboard />
          </Route>
          <Route path="/predictions">
            <RealtimeDashboard />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
