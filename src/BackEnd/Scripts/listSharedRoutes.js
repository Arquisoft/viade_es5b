import { space, schema } from 'rdf-namespaces';
import { fetchDocument } from "tripledoc";
import {existsFile} from "./helpers/fileHelper";
import {getAmigoByWebId} from "./helpers/friendHelper";
import {readRouteFromUrl} from "./helpers/routeHelper";

import RutaAmigo from "../../front-end/model/RutaAmigo.js";

const auth = require("solid-auth-client");

export async function listSharedRoutes() {
  let session = await auth.currentSession();
  if (!session) {
    window.location.href = "/login";
  }

  const profileDocument = await fetchDocument(session.webId);
  const profile = profileDocument.getSubject(session.webId);

  // Get the root URL of the user's Pod:
  const storage = profile.getRef(space.storage);
  var result = [];
  //Leemos las rutas del documento de compartidas si existe el documento
  if(await existsFile(storage +'private', 'friendSharedRoutes.ttl')){
    const sharedRoutesDocument = await fetchDocument(storage + 'private/friendSharedRoutes.ttl');
    if (sharedRoutesDocument != null) {
      let rutas = sharedRoutesDocument.getAllSubjectsOfType('http://arquisoft.github.io/viadeSpec/route');

      //ya tengo todas las url
      for (var e = 0; e < rutas.length; e++) {
        var routeUrl=rutas[e].getRef(schema.url);
        var friendWebId=rutas[e].getRef(schema.agent);
        result = [...result,new RutaAmigo(await readRouteFromUrl(routeUrl), await getAmigoByWebId(friendWebId))];
      }
    }
  }
  console.log(result);
  return result;
}