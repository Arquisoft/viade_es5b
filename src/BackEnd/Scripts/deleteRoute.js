import { space } from 'rdf-namespaces';
import { fetchDocument} from 'tripledoc';
import {deleteFile} from "./helpers/fileHelper";
const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

export async function deleteRoute(uuid) {
    let session = await auth.currentSession();
    if (!session) {window.location.href = "/login";}
    const profileDocument = await fetchDocument(session.webId);
    const profile = profileDocument.getSubject(session.webId);

    // Get the root URL of the user's Pod:
    const storage = profile.getRef(space.storage)
    var route = storage + 'private/routes/' + uuid + '.ttl';
    console.log("delete route : "+route);
    //Puede que este en la carpeta publica en vez de privada
    if(fc.itemExists(route))
        return await deleteFile(route);
    else
        return await deleteFile(storage + 'public/routes/' + uuid + '.ttl');
}
//

