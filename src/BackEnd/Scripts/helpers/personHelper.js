import { fetchDocument } from 'tripledoc'
import Persona from '../../../front-end/model/Persona.js'

export async function getPersonaByWebId (webId) {
  const profileDoc = await fetchDocument(webId)
  var profile = profileDoc.getSubject(webId)
  var person = new Persona(profile.getString('http://xmlns.com/foaf/0.1/name'), webId, profile.getRef('http://www.w3.org/2006/vcard/ns#hasPhoto'))
  return person
}
