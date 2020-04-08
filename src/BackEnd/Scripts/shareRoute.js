import { sendNotificationBody } from "./helpers/notificationHelper"
import { getRootStorage } from "./helpers/fileHelper"
import { addToMySharedRoutes } from "./addToMySharedRoutes"
import {AccessControlList} from "@inrupt/solid-react-components"
import { fetchDocument } from "tripledoc"
import { schema } from "rdf-namespaces"





const auth = require("solid-auth-client")

// Envia al usuario un mensaje con la direccion de la ruta a compartir que se guardara en su inbox
// Luego, si logre mandarlo, muevo la ruta de la carpeta privada a la publica.
// si logro compartirla devuelvo true sino false.

export async function shareRoute (friendWebId, routeUUID) {
  var result = false
  const session = await auth.currentSession()
  if (!session) { window.location.href = "/login" }

  // Get the root URL of the user"s Pod:
  const storage = await getRootStorage(session.webId)

  // Añado a rutas compartidas
  // Si no estaba compartido ya continuo
  if (await addToMySharedRoutes(friendWebId, routeUUID)) {
    // mando notificacion
    await sendShareInvitation(session.webId, friendWebId, routeUUID)
    // añado permisos para el amigo
    await updatePermissions(session.webId,storage + "private/routes/" + routeUUID + ".ttl",routeUUID)
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
//Actualizo los permisos de la ruta
async function updatePermissions(webId,filePath,routeUUID)
{
  //Busco con quien la tengo compartida y actualizo los permisos
  var friends = await getSharedFriends(webId,routeUUID)
    try {
      //Permisos a añadir
      const permissions = [
        {
          agents: friends,
          modes: [AccessControlList.MODES.APPEND,AccessControlList.MODES.READ]
        }
      ];
      //Si existe el fichero lo sobrescribe
        const ACLFile = new AccessControlList(webId,filePath,filePath + '.acl');
          await ACLFile.createACL(permissions);
      } catch (error) {
        console.log(error)
        return false
      }
      return true;
}
async function getSharedFriends(webId,routeUUID)
{
  const route = await getRootStorage(webId) +"private/mySharedRoutes.ttl"
  const mySharedRoutesDocument = await fetchDocument(route)
  const rutas = mySharedRoutesDocument.getAllSubjectsOfType("http://arquisoft.github.io/viadeSpec/route")
  //Busco la ruta en el fichero
  for (var e = 0; e < rutas.length; e++) {
    if (rutas[e].getLiteral(schema.identifier) === routeUUID) {
      return rutas[e].getAllRefs(schema.agent)
    }
  }
  return [];


}
