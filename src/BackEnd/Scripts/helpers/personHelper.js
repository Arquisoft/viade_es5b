import { fetchDocument } from 'tripledoc';
import Persona from "../../../front-end/model/Persona.js";


export async function getPersonaByWebId(webId) {
    const profileDoc = await fetchDocument(webId);
    var profile = profileDoc.getSubject(webId);
    return new Persona(profile.getString('http://xmlns.com/foaf/0.1/name'),webId);
  }
  
