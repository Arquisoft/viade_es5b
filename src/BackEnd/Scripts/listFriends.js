const auth = require("solid-auth-client");

export async function listFriends() {
  let session = await auth.currentSession();
  if (!session) {
    window.location.href = "/login";
  }
  
  var result = [];
  return result;
}
