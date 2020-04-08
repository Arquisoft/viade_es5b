import { space, schema } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
import { existsFileInFolder } from "./helpers/fileHelper"

const auth = require("solid-auth-client")

export async function deleteFromfriendSharedRoutes (friendWebId, routeUUID) {
  var result = false
  const session = await auth.currentSession()
  if (!session) { window.location.href = "/login" }
  const route = "private/viade_es5b/friendSharedRoutes.ttl"
  const webId = session.webId

  const profileDocument = await fetchDocument(webId)
  const profile = profileDocument.getSubject(webId)

  // Get the root URL of the user"s Pod:
  const storage = profile.getRef(space.storage)

  var exists = await existsFileInFolder(storage + "private/viade_es5b", "friendSharedRoutes.ttl")
  if (exists) {
    // Borro los datos de la ruta
    const friendSharedRoutesDocument = await fetchDocument(storage + route)
    const rutas = friendSharedRoutesDocument.getAllSubjectsOfType("http://arquisoft.github.io/viadeSpec/route")
    for (var e = 0; e < rutas.length; e++) {
      // Donde encuentre esta ruta la elimino
      if (rutas[e].getLiteral(schema.identifier) === routeUUID && rutas[e].getRef(schema.agent) === friendWebId) {
        console.log("borrando ruta que me compartieron" + routeUUID)
        friendSharedRoutesDocument.removeSubject(rutas[e].asRef())
      }
    }
    await friendSharedRoutesDocument.save()
  }
  return result
}
