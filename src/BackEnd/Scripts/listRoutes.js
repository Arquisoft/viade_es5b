import { space } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import {readFolder} from "./helpers/fileHelper";
import {readRouteFromUrl} from "./helpers/routeHelper";
const auth = require("solid-auth-client");

export async function listRoutes() {
  let session = await auth.currentSession();
  if (!session) {
    window.location.href = "/login";
  }

  const profileDocument = await fetchDocument(session.webId);
  const profile = profileDocument.getSubject(session.webId);

  // Get the root URL of the user's Pod:
  const storage = profile.getRef(space.storage);
  var result1 = [];
  var result2 = [];

  //Leemos rutas tanto privadas como publicas
  result1=await readRoutes(storage + "private/routes/");
  result2=await readRoutes(storage + "public/routes/");

  return result1.concat(result2);

}
async function readRoutes(folderRoute)
{
  let folder= await readFolder(folderRoute);
  var result = [];
  if (folder) {
    for (var i = 0; i < folder.files.length; i++) {
      let ruta=await readRouteFromUrl(folder.files[i].url);
      if(ruta!=null)
        result = [...result, ruta];
      }
    }
  return result;
}
