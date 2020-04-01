import { space, schema } from 'rdf-namespaces'
import { fetchDocument } from 'tripledoc'
import { existsFile } from './helpers/fileHelper'
import { getPersonaByWebId } from './helpers/personHelper'
import { readRouteFromUrl } from './helpers/routeHelper'

import RutaAmigo from '../../front-end/model/RutaAmigo.js'

const auth = require('solid-auth-client')

export async function listSharedRoutes () {
  const session = await auth.currentSession()
  if (!session) {
    window.location.href = '/login'
  }

  const profileDocument = await fetchDocument(session.webId)
  const profile = profileDocument.getSubject(session.webId)

  // Get the root URL of the user's Pod:
  const storage = profile.getRef(space.storage)
  var result = []
  // Leemos las rutas del documento de compartidas si existe el documento
  if (await existsFile(storage + 'private', 'friendSharedRoutes.ttl')) {
    const sharedRoutesDocument = await fetchDocument(storage + 'private/friendSharedRoutes.ttl')
    if (sharedRoutesDocument != null) {
      const rutas = sharedRoutesDocument.getAllSubjectsOfType('http://arquisoft.github.io/viadeSpec/route')

      // ya tengo todas las url
      for (var e = 0; e < rutas.length; e++) {
        var routeUrl = rutas[e].getRef(schema.url)
        var friendWebId = rutas[e].getRef(schema.agent)
        // comprobamos que existan las rutas, si existen las añadimos al resultado
        var route = await readRouteFromUrl(routeUrl)
        var person = await getPersonaByWebId(friendWebId)
        if (route !== null && person !== null) {
          result = [...result, new RutaAmigo(route, person)]
        }
      }
    }
  }
  return result
}
