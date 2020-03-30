import { schema } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import { getRootStorage } from "./helpers/fileHelper";
import { findRouteURL } from "./helpers/routeHelper";
import { getPersonaByWebId } from "./helpers/personHelper";

import Comentario from "../../front-end/model/Comentario.js";

const auth = require("solid-auth-client");

export async function listMediaOfRoute(routeUUID, authorWebId) {
  var result = [];
  return result;
}
