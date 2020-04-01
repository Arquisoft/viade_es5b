import { sendNotificationBody } from './helpers/notificationHelper'
import { findRouteURL } from './helpers/routeHelper'
import { moveFile, getRootStorage } from './helpers/fileHelper'
import { addToMySharedRoutes } from './addToMySharedRoutes'

const auth = require('solid-auth-client')

// Envia al usuario un mensaje con la direccion de la ruta a compartir que se guardara en su inbox
// Luego, si logre mandarlo, muevo la ruta de la carpeta privada a la publica.
// si logro compartirla devuelvo true sino false.

export async function shareRoute (friendWebId, routeUUID) {
  var result = false
  const session = await auth.currentSession()
  if (!session) { window.location.href = '/login' }

  // Get the root URL of the user's Pod:
  const storage = await getRootStorage(session.webId)

  // Añado a rutas compartidas
  // Si no estaba compartido ya continuo
  if (await addToMySharedRoutes(friendWebId, routeUUID)) {
    // mando notificacion
    await sendShareInvitation(session.webId, friendWebId, routeUUID)
    // Si no esta en la carpeta publica lo muevo a la misma
    let url = await findRouteURL(storage + 'private/routes/', routeUUID)
    if (url !== null) {
      return await moveFile(url, storage + 'public/routes/' + routeUUID + '.ttl')
    } else {
      // Compruebo que si no esta en la privada, este en la publica
      url = await findRouteURL(storage + 'public/routes/', routeUUID)
      if (url !== null) { return true } else { return false }
    }
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
