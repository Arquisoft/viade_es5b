import { fetchDocument } from "tripledoc";
import {getAmigoByWebId} from "./helpers/friendHelper";

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