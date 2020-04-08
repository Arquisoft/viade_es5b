import { rdf, schema } from "rdf-namespaces"
import { fetchDocument } from "tripledoc"
import { findRouteURL, getSharedRouteFriends } from "./helpers/routeHelper"
import { getRootStorage } from "./helpers/fileHelper"
import { sendNotificationBody } from "./helpers/notificationHelper"
import { v4 as uuidv4 } from "uuid"
const auth = require("solid-auth-client")

export async function addMediaToRoute (files, routeUUID,routeOwnerWebID) {
  var result = false
  const session = await auth.currentSession()
  if (!session) { window.location.href = "/login" }
  const webId = session.webId
  if(routeOwnerWebID === null) routeOwnerWebID = webId

  const storage = await getRootStorage(webId)

  let url = await findRouteURL(routeOwnerWebID, routeUUID)
  // Si la encuentro entonces inserto el archivo y mando una circular
  // (el fichero lo guardo en mi pod no en el del otro)
  if (url !== null) {
    var filenames = ""
    for (var i = 0; i < files.length; i++) {
      const file = files[i]
      filenames = filenames + ", " + file.name
      const fileName = uuidv4() + file.name
      const folder = storage + "public/files/" + fileName
      console.log("leyendo fichero " + file.name)
      const reader = new FileReader()

      reader.onload = async f => {
        const data = f.target.result
        // Lo mandamos a Solid
        const response = await auth.fetch(folder, {
          method: "PUT",
          force: true,
          headers: {
            "content-type": file.type
          },
          body: data,
          credentials: "include"
        })
        if (response.ok) {
          console.log("fichero subido " + folder)
          insertData(folder, url, webId)
        }
      }
      reader.readAsArrayBuffer(file)
    }
    if (filenames.length > 0) {
      //Si soy el dueño de la ruta mando un mensaje a todos
      if(webId === routeOwnerWebID) {
        // Busco a que amigos mandar la circular y las mando
        var friends = await getSharedRouteFriends(storage, routeUUID)
        for (let i = 0; i < friends.length; i++) {
          await sendMediaNotification(webId, friends[i], routeUUID, filenames)
        }
      }
      //sino le mando un mensaje al dueño de la ruta
      else {
        await sendMediaNotification(webId, routeOwnerWebID, url, filenames)
      }
      result = true
    }
  }
  return result
}

async function insertData (fileRoute, routeUrl, myWebId) {
  const routeDocument = await fetchDocument(routeUrl)
  // Initialise the new Subject:
  const newComment = routeDocument.addSubject()

  newComment.addRef(schema.contentUrl, fileRoute)
  newComment.addRef(schema.author, myWebId)
  newComment.addRef(rdf.type, schema.MediaObject)

  await routeDocument.save([newComment])
}
async function sendMediaNotification (webId, friendWebId, routeUrl, nombreFicheros) {
  return sendNotificationBody(webId, friendWebId,
    `@prefix as: <https://www.w3.org/ns/activitystreams#> .
    @prefix schema: <http://schema.org/> .
    <> a as:Follow ;
    schema:agent <${webId}> ;
    schema:Action "mediaRoute" ;
    schema:MediaObject "${nombreFicheros}" ;
    schema:identifier <${routeUrl}> .
    `)
}
