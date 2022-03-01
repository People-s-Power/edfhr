import FreeLayout from "layout/FreeLayout";
import ApplicantPage from "pages/ApplicantPage";
import CampaignPage from "pages/CampaignPage";
import DraftPage from "pages/DraftPage";
import LegalWorldPage from "pages/LegalWorld";
import TestPage from "pages/TestPage";
import TrainingPage from "pages/TrainingPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Loader } from "rsuite";
import AuthLayout from "./layout/AuthLayout";

import DashboardLayout from "./layout/DashboardLayout";
import ErrorPage from "./pages/ErrorPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import UsersPage from "./pages/UsersPage";

interface IPage {
  component: React.ElementType;
  layout: React.ElementType;
  path?: string;
  exact?: boolean;
  isAuth?: boolean;
  proctected: boolean;
  loading: boolean;
}

const AppRoute = ({ component: Component, layout: Layout, isAuth, loading, proctected, ...rest }: IPage): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return (
            <div className=" d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
              <Loader content="loading" />
            </div>
          );
        } else {
          if (proctected) {
            if (isAuth) {
              return (
                <Layout>
                  <Component {...props} />
                </Layout>
              );
            } else {
              return <Redirect to="/" />;
            }
          } else {
            return (
              <Layout>
                <Component {...props} />
              </Layout>
            );
          }
        }
      }}
    />
  );
};

const Routes = ({ isAuth, loading }: { isAuth: boolean; loading: boolean }): JSX.Element => (
  <Router basename="/v3/admin">
    <Switch>
      <AppRoute loading={false} layout={AuthLayout} proctected={false} component={LoginPage} path="/" exact />
      <AppRoute loading={loading} layout={AuthLayout} proctected={false} component={RegisterPage} path="/register/" />
      <AppRoute loading={loading} layout={AuthLayout} proctected={false} component={ForgotPasswordPage} path="/forgot-password/" />
      <AppRoute loading={loading} proctected={true} layout={DashboardLayout} component={HomePage} path="/home" isAuth={isAuth} />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={LegalWorldPage} exact path="/legalworld" />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={ApplicantPage} exact path="/applications" />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={ApplicantPage} exact path="/applications/:id" />

      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={UsersPage} exact path="/users" />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={UsersPage} exact path="/users/:id" />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={CampaignPage} exact path="/campaigns" />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={ProfilePage} path="/profile" />
      <AppRoute loading={loading} proctected={true} isAuth={isAuth} layout={DashboardLayout} component={TrainingPage} path="/training" />
      <AppRoute loading={loading} proctected={false} isAuth={true} layout={FreeLayout} component={DraftPage} path="/applications/:id/draft" />
      <AppRoute loading={false} proctected={false} isAuth={true} layout={FreeLayout} component={TestPage} path="/test" />

      <AppRoute loading={loading} proctected={false} component={ErrorPage} layout={AuthLayout} />
    </Switch>
  </Router>
);

export default Routes;
