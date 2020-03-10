import { space, rdf, solid, schema } from 'rdf-namespaces';
import { fetchDocument,createDocument } from 'tripledoc'; 
const auth = require('solid-auth-client')
const FC   = require('solid-file-client')
const fc   = new FC( auth )





export async function addRoute(ruta) {
    let session = await auth.currentSession();
    if (!session) {window.location.href = "/login";}
    console.log('Logged in as ${session.webId}.');

    const route='private/routes/'+ruta.nombre+'.ttl';
    const webId=session.webId;
    
    await newDocument(webId,route);
    await insertData(webId,route,ruta);


    //if( await fc.itemExists( session.webId ) )
    //let folder =await fc.readFolder("https://pedro223.inrupt.net/private/rutas/") ;
    //if( folder)
    //{
        //for(var i=0; i < folder.files.length; i++)
        //{ 
            //console.log(folder.files[i].name)
        //}
        //let content = await fc.readFile( session.webId );
        //console.log(content);

       
        //let file = folder.url+ruta.nombre;
        //let content='test';
        //fc.createFile(file,content,'ttl').then(success => {
        //console.log(`New File for ${file}.`)
        //}, err => console.log(err));    

    //}

}

//https://vincenttunru.gitlab.io/tripledoc/
async function newDocument(webId,route)
{

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
async function insertData(webId,route,ruta)
{ 
    const profileDocument = await fetchDocument(webId);
    const documentoRuta = await fetchDocument(profileDocument.getSubject(webId).getRef(space.storage) + route);

    // Initialise the new Subject:
    const newNote = documentoRuta.addSubject();

    // Indicate that the Subject is a schema:TextDigitalDocument:
    newNote.addRef(rdf.type, schema.TextDigitalDocument);
  
    newNote.addString('nombre', ruta.nombre);
    newNote.addString('descripcion', ruta.descripcion);
  
    //hora de creación
    newNote.addDateTime(schema.dateCreated, new Date(Date.now()))
  
    await documentoRuta.save([newNote]);
}

