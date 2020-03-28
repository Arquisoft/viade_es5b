import { fetchDocument } from 'tripledoc';
import Amigo from "../../../front-end/model/Amigo.js";


export async function getAmigoByWebId(webId) {
    const profileDoc = await fetchDocument(webId);
    var profile = profileDoc.getSubject(webId);
    return new Amigo(profile.getString('http://xmlns.com/foaf/0.1/name'),webId);
  }
  
