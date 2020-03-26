import { space, schema } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import Ruta from "../../front-end/model/Ruta.js";
import Hito from "../../front-end/model/Hito.js";
const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

export async function listRoutes() {
  let session = await auth.currentSession();
  if (!session) {
    window.location.href = "/login";
  }

  const profileDocument = await fetchDocument(session.webId);
  const profile = profileDocument.getSubject(session.webId);

  // Get the root URL of the user's Pod:
  const storage = profile.getRef(space.storage);

  let folder;
  await fc
    .readFolder(storage + "private/routes/")
    .then(content => {
      folder = content;
    })
    .catch(err => (folder = null));

  var result = [];
  if (folder) {
    for (var i = 0; i < folder.files.length; i++) {
      console.log(folder.files[i].url);
      let routeDoc;
      await fetchDocument(folder.files[i].url)
        .then(content => {
          routeDoc = content;
        })
        .catch(err => (routeDoc = null));

      if (routeDoc != null) {
        const route = routeDoc.getSubject("#ruta");

        let puntos = routeDoc.getSubjectsOfType(
          "http://arquisoft.github.io/viadeSpec/points"
        );

        let ruta = new Ruta(
          route.getString(schema.name),
          [
            puntos[0].getDecimal(schema.latitude),
            puntos[0].getDecimal(schema.longitude)
          ],
          route.getString(schema.description)
        );
        ruta.setUUID(route.getString(schema.identifier));

        for (var e = 1; e < puntos.length; e++)
        {
                ruta.addHito(new Hito(puntos[e].getString(schema.name),puntos[e].getDecimal(schema.latitude),puntos[e].getDecimal(schema.longitude)));
        }
        result=[...result,ruta];
      }
    };
  }
  return result;
}
