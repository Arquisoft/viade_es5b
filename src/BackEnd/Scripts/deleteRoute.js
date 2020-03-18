import { space, schema } from 'rdf-namespaces';
import { fetchDocument} from 'tripledoc';
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

    let folder;
    await fc.readFolder(storage + 'private/routes/').then((content) => {
        folder=content;
    })
    .catch(err => folder=null);
    if (folder) 
    {

        for (var i = 0; i < folder.files.length; i++) 
        {
            console.log(folder.files[i].url)
            let routeDoc;
            await fetchDocument(folder.files[i].url).then((content) => {
                routeDoc=content;
            })
            .catch(err => routeDoc=null);

            if(routeDoc!=null)
            {
                var route = routeDoc.getSubject('#ruta');
                var ID=route.getString(schema.identifier);
                if(ID===uuid)
                {
                    //Es la misma, asi que la borramos
                    fc.delete(folder.files[i].url); 
                    return true;
                }
            }
        };
    }
    return false;
}

