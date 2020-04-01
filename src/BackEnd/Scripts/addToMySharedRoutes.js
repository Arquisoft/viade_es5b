import { rdf, space, schema } from "rdf-namespaces"
import { fetchDocument, createDocument } from "tripledoc"
import { existsFile } from "./helpers/fileHelper"

const auth = require("solid-auth-client")

// agrego la ruta que le he compartido a alguien y a quien se la he compartido
// a un fichero de rutas compartidas, para saber con quienes la he compartido y si la habia
// compartido con ellos previamente.

// me devuelve false si hubo algun problema o la combinacion persona/ruta esta repetida
export async function addToMySharedRoutes (friendWebId, routeUUID) {
  const session = await auth.currentSession()
  if (!session) { window.location.href = "/login" }
  const route = "private/mySharedRoutes.ttl"
  const webId = session.webId

  const profileDocument = await fetchDocument(webId)
  const profile = profileDocument.getSubject(webId)

  // Get the root URL of the user"s Pod:
  const storage = profile.getRef(space.storage)

  var exists = await existsFile(storage + "private", "mySharedRoutes.ttl")
  // si no existe el documento lo creo
  if (!exists) { await newDocument(storage + route) }
  // agrego la ruta y con quien la he compartido
  return await insertData(storage + route, friendWebId, routeUUID)
}
async function newDocument (route) {
  // Create the new Document:
  const mySharedRoutesDocument = createDocument(route)
  await mySharedRoutesDocument.save()
}
async function insertData (route, friend, routeUUID) {
  var result = true
  const mySharedRoutesDocument = await fetchDocument(route)

  let ruta = null
  const rutas = mySharedRoutesDocument.getAllSubjectsOfType("http://arquisoft.github.io/viadeSpec/route")
  for (var e = 0; e < rutas.length; e++) {
    // Si ya existe un subject con el identificador de la ruta, entonces uso ese
    if (rutas[e].getLiteral(schema.identifier) === routeUUID) {
      ruta = rutas[e]
      // compruevo que no este el amigo aqui ya metido
      const amigos = rutas[e].getAllRefs(schema.agent)
      for (var i = 0; i < amigos.length; i++) {
        // esta repetido si lo encuentro
        if (amigos[i] === friend) {
          result = false
          break
        }
      }
      break
    }
  }
  // Si no la encontro creo un nuevo subject. sino uso el que encontro
  if (ruta === null) {
    ruta = mySharedRoutesDocument.addSubject()
    ruta.addLiteral(schema.identifier, routeUUID)
    ruta.addRef(rdf.type, "http://arquisoft.github.io/viadeSpec/route")
  }
  if (result) {
    ruta.addRef(schema.agent, friend)
    await mySharedRoutesDocument.save([ruta])
  }
  return result
}
