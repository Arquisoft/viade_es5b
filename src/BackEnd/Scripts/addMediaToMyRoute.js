import { rdf, schema } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import {findRouteURL,getSharedRouteFriends} from "./helpers/routeHelper";
import {getRootStorage} from "./helpers/fileHelper";
import {sendNotificationBody} from "./helpers/notificationHelper";
import { v4 as uuidv4 } from "uuid";
const auth = require("solid-auth-client");


export async function addMediaToMyRoute(files,routeUUID){
    var result=false;
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
        var filenames='';
        for(var i=0;i<files.length;i++){
            const file=files[i];
            filenames=filenames+", "+file.name;
            const fileName=uuidv4()+file.name;
            let folder = storage + "public/files/"+fileName;
            console.log("leyendo fichero "+file.name);
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
                    console.log("fichero subido "+folder);
                    insertData(folder,url,webId)
                  }
                };
             reader.readAsArrayBuffer(file);
            }
            //Busco a que amigos mandar la circular y las mando
            if(filenames.length>0)
            {
                var friends = await getSharedRouteFriends(storage,routeUUID);
                for(let i=0;i<friends.length;i++)
                {
                  console.log("enviando notificacion subida Fichero a "+friends[i]);
                    await sendMediaNotification(webId,friends[i],routeUUID,filenames);
                }
                result = true;
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
async function sendMediaNotification(webId,friendWebId,routeUUID,nombreFicheros) {
    return sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:Action "mediaRoute" ;
    schema:MediaObject "${nombreFicheros}" ;
    schema:identifier "${routeUUID}" .
    `);
}
