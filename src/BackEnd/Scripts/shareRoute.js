import { sendNotificationBody } from "./helpers/notificationHelper"
import { updateRoutePermissions } from "./helpers/routeHelper"
import { addToMySharedRoutes } from "./addToMySharedRoutes"





const auth = require("solid-auth-client")

// Envia al usuario un mensaje con la direccion de la ruta a compartir que se guardara en su inbox
// Luego, si logre mandarlo, muevo la ruta de la carpeta privada a la publica.
// si logro compartirla devuelvo true sino false.

export async function shareRoute (friendWebId, routeUUID) {
  var result = false
  const session = await auth.currentSession()
  if (!session) { window.location.href = "/login" }

  // Añado a rutas compartidas
  // Si no estaba compartido ya continuo
  if (await addToMySharedRoutes(friendWebId, routeUUID)) {
    // mando notificacion
    await sendShareInvitation(session.webId, friendWebId, routeUUID)
    // añado permisos para el amigo
    await updateRoutePermissions(session.webId,routeUUID)
  }
  return result
}
async function sendShareInvitation (webId, friendWebId, routeUUID) {
  return sendNotificationBody(webId, friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:Action "shareRoute" ;
    schema:identifier "${routeUUID}" .
    `)
}
