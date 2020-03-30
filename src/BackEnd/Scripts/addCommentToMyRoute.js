import { rdf, schema } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import {findRouteURL} from "./helpers/routeHelper";
import {getRootStorage,existsFile} from "./helpers/fileHelper";
import {sendNotificationBody} from "./helpers/notificationHelper";
import {listCommentsOfRoute} from "./listCommentsOfRoute";




const auth = require('solid-auth-client')

export async function addCommentToMyRoute(comentario,routeUUID){
    var result=[];
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }    
    let storage= await getRootStorage(session.webId);
    let webId=session.webId;

    let url= await findRouteURL(storage + 'private/routes/',routeUUID);
    //Si no la encuentro la busco en publico
    if (url===null) 
        url= await findRouteURL(storage + 'public/routes/',routeUUID);
    //Si la encuentro entonces inserto el comentario y mando una circular
    if (url!==null) 
    {
        await insertData(comentario,url,webId);
        result = await listCommentsOfRoute(routeUUID);
        //Busco a que amigos mandar la circular y las mando
        var friends = await getSharedRouteFriends(storage,routeUUID);
        for(let i=0;i<friends.length;i++)
        {
            sendCommentNotification(webId,friends[i],routeUUID,comentario);
        }
    }
    return result;
}

async function insertData(comentario, routeUrl,myWebId) {
    const routeDocument = await fetchDocument(routeUrl);    
    // Initialise the new Subject:
    const newComment = routeDocument.addSubject();

    newComment.addString(schema.text,comentario.getTexto());
    newComment.addDateTime(schema.datePublished,comentario.getFecha());
    newComment.addRef(schema.author,myWebId);
    newComment.addRef(rdf.type, 'http://arquisoft.github.io/viadeSpec/userComment');

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

async function sendCommentNotification(webId,friendWebId,routeUUID,comentario) {
    return sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:action "commentRoute" ;
    schema:comment "${comentario.getTexto()}" ;
    schema:identifier "${routeUUID}" .
    `);
}
