import React, { useEffect } from 'react';
import { Route} from 'react-router-dom';
import { withAuthorization } from '@inrupt/solid-react-components';
import  AuthNavBar  from '../../components/AuthNavBar/auth-nav-bar.component';
import  {permissionsHelper}  from '../../utils/index';

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const errorMessages = {
    message: "No dispone de permisos para realizar esa acción.",
    title: "Error",
    label: "Informate",
    href: "https://solidsdk.inrupt.net/public/general/en/app-permissions.html"
  };
  useEffect(() => {
    if (webId) {
      permissionsHelper.checkPermissions(webId, errorMessages);
    }
  }, [webId]);

  return (
        <Route
          {...rest}
          component={({ history }) => (
              <AuthNavBar {...{ location, webId, history }} />
          )}
        />
  );
};

export default withAuthorization(PrivateLayout);
