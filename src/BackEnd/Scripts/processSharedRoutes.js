import { getNotificationDocuments } from './helpers/notificationHelper'
import { schema } from 'rdf-namespaces'
import { findRouteURL, readRouteFromUrl } from './helpers/routeHelper'
import { getRootStorage, deleteFile } from './helpers/fileHelper'
import { addSharedRoute } from './addSharedRoute'
import { deleteFromfriendSharedRoutes } from './deleteFromfriendSharedRoutes'

import { getPersonaByWebId } from './helpers/personHelper'

import Notificacion from '../../front-end/model/Notificacion.js'

const auth = require('solid-auth-client')

// Comprueba todos los mensajes del usuario, busca los que sean del tipo ruta compartida
// añade esas rutas compartidas al fichero de compartidas
// dicho fichero contendra <uuid ruta> <perfil amigo>
// devuelve la ruta y el amigo que la compartio contigo

export async function processSharedRoutes () {
  const session = await auth.currentSession()
  var result = []
  if (session) {
    const documents = await getNotificationDocuments(session.webId)
    if (documents.length > 0) {
      for (let i = 0; i < documents.length; i++) {
        var message = documents[i].getSubject('')
        var action = message.getString(schema.action)
        /// Si es del tipo shareRoute es que quiere compartir una ruta con nosotros
        if (action === 'shareRoute') {
          // Comprobamos si existe de verdad la ruta en la parte publica del usuario, si existe
          // continuamos
          const friendWebId = message.getRef(schema.agent)
          const storage = await getRootStorage(friendWebId)
          const routeUrl = await findRouteURL(storage + 'public/routes/', message.getString(schema.identifier))
          if (routeUrl !== null) {
            // Si lo encontro entonces insertamos en el apartado de rutas compartidas y borramos el mensaje
            await addSharedRoute(friendWebId, routeUrl, message.getString(schema.identifier))
            // Añadimos al resultado una nueva notificacion
            const ruta = await readRouteFromUrl(routeUrl)
            const persona = await getPersonaByWebId(friendWebId)
            result = [...result, new Notificacion(persona.getNombre() + ' te ha Compartido una ruta!', 'Ruta : ' + ruta.getNombre())]
          }
          // borramos la notificacion
          await deleteFile(documents[i].asRef())
        }
        // Si es del tipo commentRoute es que alguien ha comentado en una ruta compartida
        if (action === 'commentRoute') {
          // Comprobamos si existe de verdad la ruta en la parte publica del usuario, si existe
          // continuamos
          const friendWebId = message.getRef(schema.agent)
          const storage = await getRootStorage(friendWebId)
          const routeUrl = await findRouteURL(storage + 'public/routes/', message.getString(schema.identifier))
          if (routeUrl !== null) {
            // Si la encontro entonces mostramos una notificacion al usuario
            const ruta = await readRouteFromUrl(routeUrl)
            const persona = await getPersonaByWebId(friendWebId)
            result = [...result, new Notificacion(persona.getNombre() + ' ha comentado', 'En ' + ruta.getNombre() + ': ' + message.getString(schema.comment))]
          }
          // borramos la notificacion
          await deleteFile(documents[i].asRef())
        }
        // Si es del tipo mediaRoute es que alguien ha subido un fichero en una ruta compartida
        if (action === 'mediaRoute') {
          // Comprobamos si existe de verdad la ruta en la parte publica del usuario, si existe
          // continuamos
          const friendWebId = message.getRef(schema.agent)
          const storage = await getRootStorage(friendWebId)
          const routeUrl = await findRouteURL(storage + 'public/routes/', message.getString(schema.identifier))
          if (routeUrl !== null) {
            // Si la encontro entonces mostramos una notificacion al usuario
            const ruta = await readRouteFromUrl(routeUrl)
            const persona = await getPersonaByWebId(friendWebId)
            result = [...result, new Notificacion(persona.getNombre() + ' subio un archivo', 'En ' + ruta.getNombre() + ': ' + message.getString(schema.MediaObject))]
          }
          // borramos la notificacion
          await deleteFile(documents[i].asRef())
        }
        if (action === 'deleteRoute') {
          // Eliminamos la ruta de rutas compartidas conmigo
          await deleteFromfriendSharedRoutes(message.getRef(schema.agent), message.getString(schema.identifier))
          // Mostramos que se borro la ruta
          const persona = await getPersonaByWebId(message.getRef(schema.agent))
          result = [...result, new Notificacion(persona.getNombre() + ' Ha borrado la ruta', 'Ruta : ' + message.getString(schema.comment))]
          // borramos la notificacion
          await deleteFile(documents[i].asRef())
        }
      }
    }
  }
  return result
}
