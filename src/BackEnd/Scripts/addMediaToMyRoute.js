import { rdf, schema } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import {findRouteURL} from "./helpers/routeHelper";
import {getRootStorage,existsFile} from "./helpers/fileHelper";
import {sendNotificationBody} from "./helpers/notificationHelper";
import { v4 as uuidv4 } from "uuid";
const auth = require("solid-auth-client");


export async function addMediaToMyRoute(files,routeUUID){
    var result=[];
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }    
    const storage= await getRootStorage(session.webId);
    const webId=session.webId;

    var url= await findRouteURL(storage + 'private/routes/',routeUUID);
    //Si no la encuentro la busco en publico
    if (url===null) 
        url= await findRouteURL(storage + 'public/routes/',routeUUID);
    //Si la encuentro entonces inserto el archivo y mando una circular
    if (url!==null) 
    {
        for(var i=0;i<files.length;i++){
            const file=files[i];
            const fileName=uuidv4()+file.name;
            let folder = storage + "public/"+fileName;
            console.log("leyendo fichero");
            const reader = new FileReader();
    
              /* eslint no-loop-func: 0 */
              reader.onload = async f => {
                
                  const data = f.target.result;
                  //Lo mandamos a Solid
                  const response = await auth.fetch(folder, {
                    method: 'PUT',
                    force: true,
                    headers: {
                      'content-type': file.type
                    },
                    body: data,
                    credentials: 'include'
                  });
                  if (response.ok) {
                    console.log("fichero subido");
                    insertData(fileName,url,webId)

                    //Busco a que amigos mandar la circular y las mando
                    var friends = await getSharedRouteFriends(storage,routeUUID);
                    for(let i=0;i<friends.length;i++)
                    {
                        sendMediaNotification(webId,friends[i],routeUUID,file.name);
                    }
                  }
                };
             reader.readAsArrayBuffer(file);
            }
    }
    return result;
}

async function insertData(fileRoute, routeUrl,myWebId) {
    const routeDocument = await fetchDocument(routeUrl);    
    // Initialise the new Subject:
    const newComment = routeDocument.addSubject();

    newComment.addRef(schema.contentUrl,fileRoute);
    newComment.addRef(schema.author,myWebId);
    newComment.addRef(rdf.type, schema.MediaObject);

    await routeDocument.save([newComment]);
}
async function getSharedRouteFriends(storage,routeUUID) {
    var result=[];
    var exists=await existsFile(storage + 'private','mySharedRoutes.ttl');
    if(exists)
    {
        const mySharedRoutesDocument = await fetchDocument(storage + 'private/mySharedRoutes.ttl');
        
        let rutas = mySharedRoutesDocument.getAllSubjectsOfType('http://arquisoft.github.io/viadeSpec/route');
        for (var e = 0; e < rutas.length; e++) {
          //Miro a ver si estoy compartiendo esta ruta
          if(rutas[e].getLiteral(schema.identifier)===routeUUID)
          {
              //Si la estoy compartiendo entonces saco los amigos con los que la comparto
              let amigos=rutas[e].getAllRefs(schema.agent)
              for (var i = 0; i < amigos.length; i++) {
                  //los añado a result
                  result = [...result, amigos];
              }
              //Ya encontre lo que busco asi que salgo
              break;
          }
        }
    }
    return result;
}
async function sendMediaNotification(webId,friendWebId,routeUUID,nombreFichero) {
    return sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:action "mediaRoute" ;
    schema:MediaObject "${nombreFichero}" ;
    schema:identifier "${routeUUID}" .
    `);
}
