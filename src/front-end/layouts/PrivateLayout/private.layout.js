import React, { useEffect } from 'react';
import { Route} from 'react-router-dom';
import { withAuthorization } from '@inrupt/solid-react-components';
import { AuthNavBar } from '@components';
import { permissionHelper } from '@utils';

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  useEffect(() => {
    if (webId) {
      permissionHelper.checkPermissions(webId, errorMessages);
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
