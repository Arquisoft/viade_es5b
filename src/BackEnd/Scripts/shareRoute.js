
import {sendNotificationBody} from "./helpers/notificationHelper";

const auth = require("solid-auth-client");


//Envia al usuario un mensaje con la direccion de la ruta a compartir que se guardara en su inbox
export async function shareRoute(friendWebId,Ruta) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }

    const webId = session.webId;
    sendNotificationBody(webId,friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    
    <> a as:${'SharedRoute'} ;
    schema:agent <${webId}> ;
    schema:identifier <${Ruta.getUUID()}> .
    `);
}
