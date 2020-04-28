import {
  AccessControlList,
  AppPermission,
} from "@inrupt/solid-react-components";
const auth = require("solid-auth-client");

export async function validAppPermissions() {
  const session = await auth.currentSession();
  if (!session) {
    window.location.href = "/login";
  }
  const webId = session.webId;

  const userApp = await AppPermission.checkPermissions(webId);

  const permissions = AccessControlList.MODES;
  const { APPEND, READ, WRITE, CONTROL } = permissions;

  if (userApp !== null && userApp.permissions !== null) {
    var hasPermissions = [APPEND, READ, WRITE, CONTROL].every((permission) =>
      userApp.permissions.includes(permission)
    );
    if (hasPermissions) {
      return true;
    }
  }
  return false;
}
