import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import generateCustomTheme from "./theme"
import Layout from "./components/Layout"
import PerformanceDashboard from "./PerformanceDashboard"
import RealtimeDashboard from "./RealtimeDashboard"

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
    generateCustomTheme(false),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
