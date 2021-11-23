/* eslint-disable react/jsx-props-no-spreading */
import { Redirect, Route, RouteProps } from "react-router-dom";
import { getFromStorage } from "./global";

export default function PrivateRoute({ ...routeProps }: RouteProps) {
  if (getFromStorage("token")) {
    return <Route {...routeProps} />;
  }
  return <Redirect to="/login" />;
}
