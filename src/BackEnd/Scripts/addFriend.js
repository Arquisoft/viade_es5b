import { rdf } from 'rdf-namespaces'
import { fetchDocument } from 'tripledoc'
const auth = require('solid-auth-client')

// Añade el usuario a amigos, si logra añadirlo devuelve true sino false.
export async function addFriend (friendWebId) {
  const session = await auth.currentSession()
  if (!session) { window.location.href = '/login' }

  const webId = session.webId
  // Compruebo si ya es mi amigo, si no lo es lo añado (y si no soy yo mismo)
  var friend = false
  var result = false
  const profileDoc = await fetchDocument(webId)
  const profile = profileDoc.getSubject(webId)
  var friends = profile.getAllNodeRefs('http://xmlns.com/foaf/0.1/knows')
  for (var i = 0; i < friends.length; i += 1) {
    if (friends[i] === friendWebId) {
      friend = true
      console.log(friendWebId + 'ya era mi amigo')
    }
  }
  // Si no es amigo lo añado
  if (await isValidProfile(friendWebId) && !friend && friendWebId !== webId) {
    await insertData(webId, friendWebId)
    result = true
  }
  console.log(friendWebId + 'agregado a amigos')
  return result
}

// https://unhosted.org/using-solid/
// https://codesandbox.io/s/peaceful-payne-su5t6?fontsize=14
async function insertData (webId, friendWebId) {
  const profileDocument = await fetchDocument(webId)

  // Inicializamos un Subject Persona:
  const newFriend = profileDocument.addSubject({
    identifier: friendWebId
  })
  // Indicamos que el Subject es Una Persona
  newFriend.addRef(rdf.type, 'http://xmlns.com/foaf/0.1/person')

  // Le añadimos con su alias
  // newFriend.addString('http://xmlns.com/foaf/0.1/label', alias);

  // Añadimos un nuevo Subject de que Conocemos a la Persona (es amigo)
  const newKnown = profileDocument.addSubject({
    identifier: 'me'
  })

  newKnown.addRef('http://xmlns.com/foaf/0.1/knows', friendWebId)

  await profileDocument.save([newFriend, newKnown])
}

// Si puedo acceder a su perfil y tiene un nombre, es amigo válido
async function isValidProfile (friendWebId) {
  var isValid = false
  let profileDoc
  await fetchDocument(friendWebId)
    .then(content => {
      profileDoc = content
    })
    .catch(err => (profileDoc = null))
  if (profileDoc !== null) {
    var profile = profileDoc.getSubject(friendWebId)
    if (profile !== null) {
      var name = profile.getString('http://xmlns.com/foaf/0.1/name')
      if (name !== null && name !== '') { isValid = true }
    }
  }
  return isValid
}
