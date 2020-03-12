import { space, rdf, solid, schema, foaf } from 'rdf-namespaces';
import { fetchDocument} from 'tripledoc';
import Ruta from "../../front-end/model/Ruta.js";
//import { LocalTripleDocumentForContainer } from 'tripledoc/dist/document';
const auth = require('solid-auth-client')
const FC = require('solid-file-client')
const fc = new FC(auth)
export async function deleteRoute(uuid) {
    let session = await auth.currentSession();
    if (!session) {window.location.href = "/login";}
    const profileDocument = await fetchDocument(session.webId);
    const profile = profileDocument.getSubject(session.webId);

    // Get the root URL of the user's Pod:
    const storage = profile.getRef(space.storage)
    let folder = await fc.readFolder(storage + 'private/routes/');

   
    var datosDeRuta = [];
    if (folder) {

        for (var i = 0; i < folder.files.length; i++) {
            console.log(folder.files[i].url)
            const routeDoc = await fetchDocument(folder.files[i].url);
            var route = routeDoc.getSubject('#ruta');
            datosDeRuta=route.getAllStrings();
            var ID=datosDeRuta.find(schema.identifier);
            if(ID==uuid){
                //Es la misma, asi que la borramos
               fc.deleteFile(folder.files[i]); 
               return true;
            }
        };
    }
    return false;
}

