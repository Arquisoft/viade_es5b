import { rdf,space, schema } from 'rdf-namespaces';
import { fetchDocument, createDocument } from 'tripledoc';
import {existsFile} from "./helpers/fileHelper";


const auth = require('solid-auth-client')

export async function addSharedRoute(friendWebId,routeUrl) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }
    const route = 'private/friendSharedRoutes.ttl';
    const webId = session.webId;

    const profileDocument = await fetchDocument(webId);
    const profile = profileDocument.getSubject(webId);

    // Get the root URL of the user's Pod:
    const storage = profile.getRef(space.storage);

    var exists=await existsFile(storage + 'private','friendSharedRoutes.ttl');
    //si no existe el documento lo creo
    if(!exists)
        await newDocument(storage + route);
    //agrego la ruta y quien me lo compartio al fichero
    insertData(storage + route,friendWebId,routeUrl)

}
async function newDocument(route) {
    // Create the new Document:
    const sharedRoutesDocument = createDocument(route);
    await sharedRoutesDocument.save();
}
async function insertData(route, friend, routeUrl) {
    const sharedRoutesDocument = await fetchDocument(route);
    // Initialise the new Subject:
    const newShare = sharedRoutesDocument.addSubject();

    newShare.addRef(schema.agent,friend);
    newShare.addRef(schema.url,routeUrl);
    newShare.addRef(rdf.type, 'http://arquisoft.github.io/viadeSpec/route');

    await sharedRoutesDocument.save([newShare]);
}
 

