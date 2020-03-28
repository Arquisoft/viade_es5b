
import {sendNotificationBody} from "./helpers/notificationHelper";
import {moveFile} from "./helpers/fileHelper";


const auth = require("solid-auth-client");


//Envia al usuario un mensaje con la direccion de la ruta a compartir que se guardara en su inbox
//Luego, si logre mandarlo, muevo la ruta de la carpeta privada a la publica.
//si logro compartirla devuelvo true sino false.

export async function shareRoute(friendWebId,Ruta) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }

    if(await sendShareInvitation(session.webId,friendWebId,Ruta))
       return await moveFile('private/routes/' + Ruta.getUUID() + '.ttl','public/routes/' + Ruta.getUUID() + '.ttl')
    else
        return false;
}
async function sendShareInvitation(webId,friendWebId,Ruta) {
    return sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    
    <> a as:${'SharedRoute'} ;
    schema:agent <${webId}> ;
    schema:identifier <${Ruta.getUUID()}> .
    `);
}