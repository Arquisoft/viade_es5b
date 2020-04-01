import { schema } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import { getRootStorage } from "./helpers/fileHelper";
import { findRouteURL } from "./helpers/routeHelper";

const auth = require("solid-auth-client");

export async function listMediaOfRoute(routeUUID, authorWebId) {
  var result = [];
  let session = null;
  session = await auth.currentSession();

  if (!session) {
    window.location.href = "/login";
  }
  let storage = await getRootStorage(
    authorWebId == null ? session.webId : authorWebId
  );

  let url = await findRouteURL(storage + "private/routes/", routeUUID);
  //Si no la encuentro la busco en publico
  if (url === null)
    url = await findRouteURL(storage + "public/routes/", routeUUID);
  //Si la encuentro entonces busco los ficheros
  if (url !== null) {
    const routeDoc = await fetchDocument(url);
    let ficheros = routeDoc.getSubjectsOfType(schema.MediaObject);
    for (var i = 0; i < ficheros.length; i++) {
      let fichero = ficheros[i].getRef(schema.contentUrl)
      result = [...result, fichero];
    }
  }
  console.log(result);
  return result;
}
