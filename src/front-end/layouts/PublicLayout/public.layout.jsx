import React from "react";
import { Route } from "react-router-dom";
import { useWebId } from "@inrupt/solid-react-components";
import NavBar from "../../components/NavBar/nav-bar.component";
import AuthNavBar from "../../components/AuthNavBar/auth-nav-bar.component";

const PublicLayout = props => {
  const webId = useWebId();
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      component={({ history, location, match }) => (
        <div>
          {webId ? (
            <AuthNavBar {...{ history, location, match, webId }} />
          ) : (
            <NavBar
              {...{ history, location, match }}
            />
          )}
          <Component {...{ history, location, match }} />
        </div>
      )}
    />
  )
}

export default PublicLayout
