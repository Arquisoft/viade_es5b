import { space, rdf, solid, schema, foaf } from 'rdf-namespaces';
import { fetchDocument, createDocument } from 'tripledoc';

const auth = require('solid-auth-client')






export async function addRoute(ruta) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }
    const route = 'private/routes/' + ruta.nombre + '.ttl';
    const webId = session.webId;

    await newDocument(webId, route);
    await insertData(webId, route, ruta);

}

//https://github.com/solid/solidproject.org/blob/staging/_posts/for-developers/apps/first-app/2019-01-01-04_data-model.md
//https://vincenttunru.gitlab.io/tripledoc/
async function newDocument(webId, route) {

    const profileDocument = await fetchDocument(webId);
    const profile = profileDocument.getSubject(webId);

    // Get the root URL of the user's Pod:
    const storage = profile.getRef(space.storage);

    // Decide at what URL within the user's Pod the new Document should be stored:
    const routesListRef = storage + route;
    // Create the new Document:
    const routesList = createDocument(routesListRef);
    await routesList.save();
}
async function insertData(webId, route, ruta) {
    const profileDocument = await fetchDocument(webId);
    const routeDocument = await fetchDocument(profileDocument.getSubject(webId).getRef(space.storage) + route);

    // Initialise the new Subject:
    const newRoute = routeDocument.addSubject({
        identifier: 'ruta'
    });

    // Indicate that the Subject is a schema:TextDigitalDocument:
    newRoute.addRef(rdf.type, 'http://arquisoft.github.io/viadeSpec/route');

    newRoute.addString(schema.name, ruta.getNombre());
    newRoute.addString(schema.description, ruta.getDescripcion());
    newRoute.addString(schema.identifier, ruta.getUUID());
    if (ruta.getInicio()) {

        for (var hito in ruta.getHitos()) {

        }
    }
    await routeDocument.save([newRoute]);


}

