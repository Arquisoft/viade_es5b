import { rdf, schema } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';
import {findRouteURL} from "./helpers/routeHelper";
import {getRootStorage} from "./helpers/fileHelper";
import {sendNotificationBody} from "./helpers/notificationHelper";




const auth = require('solid-auth-client')

export async function addCommentToMyRoute(comentario,routeUUID){
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }    
    let storage= await getRootStorage(session.webId);
    let webId=session.webId;

    let url= await findRouteURL(storage + 'private/routes/',routeUUID);
    //Si no la encuentro la busco en publico
    if (url===null) 
        url= await findRouteURL(storage + 'public/routes/',routeUUID);
    //Si la encuentro entonces inserto el comentario
    if (url!==null) 
        insertData(comentario,url,routeUUID,webId)
}

async function insertData(comentario, routeUrl,routeUUID,myWebId) {
    const routeDocument = await fetchDocument(routeUrl);
    let ruta = routeDocument.getSubject('http://arquisoft.github.io/viadeSpec/route');
    
    // Initialise the new Subject:
    const newComment = routeDocument.addSubject();

    newComment.addString(schema.text,comentario.getTexto());
    newComment.addDateTime(schema.datePublished,comentario.getFecha());
    newComment.addRef(schema.author,myWebId);
    newComment.addRef(rdf.type, 'http://arquisoft.github.io/viadeSpec/userComment');

    await routeDocument.save([newComment]);

    //sendCommentNotification(myWebId,,routeUUID);
}
async function sendCommentNotification(webId,friendWebId,routeUUID) {
    return sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:action "commentRoute" ;
    schema:identifier "${routeUUID}" .
    `);
}
