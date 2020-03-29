import { schema } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import {getRootStorage} from "./helpers/fileHelper";
import {findRouteURL} from "./helpers/routeHelper";
import {getPersonaByWebId} from "./helpers/personHelper";

import Comentario from "../../front-end/model/Comentario.js";

const auth = require("solid-auth-client");

export async function listCommentsOfRoute(routeUUID) {
  var result =[]
  let session = await auth.currentSession();
  if (!session) { window.location.href = "/login"; }    
  let storage= await getRootStorage(session.webId);

  let url= await findRouteURL(storage + 'private/routes/',routeUUID);
  //Si no la encuentro la busco en publico
  if (url===null) 
      url= await findRouteURL(storage + 'public/routes/',routeUUID);
  //Si la encuentro entonces busco los comentarios
  if (url!==null) 
  {
    const routeDoc = await fetchDocument(url); 
    let comentarios = routeDoc.getSubjectsOfType(
      "http://arquisoft.github.io/viadeSpec/userComment"
      );
      for (var i = 1; i < comentarios.length; i++) {
          let comentario = new Comentario(comentarios[i].getDateTime(schema.datePublished),comentarios[i].getString(schema.text));
          let autor= await getPersonaByWebId(comentarios[i].getRef(schema.author));
          comentario.setAutor(autor);
          result = [...result,comentario];
      }
  }
  return result;
}