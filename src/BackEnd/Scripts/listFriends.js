import { fetchDocument } from "tripledoc";
import Amigo from "../../front-end/model/Amigo.js";
const auth = require("solid-auth-client");

export async function listFriends() {
  var result = [];

  let session = await auth.currentSession();
  if (!session) {
    window.location.href = "/login";
  }

  const profileDoc = await fetchDocument(session.webId);

  var friendWebIds= profileDoc.getSubject(session.webId).getAllNodeRefs('http://xmlns.com/foaf/0.1/knows');
  for(var i=0;i<friendWebIds.length;i++)
  {
    var friend=await getAmigoByWebId(friendWebIds[i]);
    result = [...result, friend];
  }
  console.log(result);
  return result;
}

async function getAmigoByWebId(webId) {
  const profileDoc = await fetchDocument(webId);
  var profile = profileDoc.getSubject(webId);
  return new Amigo(profile.getString('http://xmlns.com/foaf/0.1/name'),webId);
}