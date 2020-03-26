import { rdf } from 'rdf-namespaces';
import { fetchDocument } from "tripledoc";
const auth = require('solid-auth-client')


//Añade el usuario a amigos, si logra añadirlo devuelve true sino false.
export async function addFriend(friendWebId) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }

    const webId = session.webId;


    //Compruebo si ya es mi amigo, si no lo es lo añado
    var friend=false;
    var result=false;
    const profileDoc = await fetchDocument(webId);
    const profile = profileDoc.getSubject(webId);
    var friends = profile.getAllNodeRefs('http://xmlns.com/foaf/0.1/knows');
    for (var i = 0; i < friends.length; i+=1)
     {
        if(friends[i]=== friendWebId)
        {
            console.log(friends[i]+" vs "+friendWebId);
            friend= true;
        }
    }
    //Si no es amigo lo añado
    if(!friend)
    {
        console.log(friendWebId+" no existe");
        await insertData(webId,friendWebId);
        result=true;
    }
    console.log(result);
    return result;
}

//https://unhosted.org/using-solid/
//https://codesandbox.io/s/peaceful-payne-su5t6?fontsize=14
async function insertData(webId,friendWebId) {
    const profileDocument = await fetchDocument(webId);

    // Inicializamos un Subject Persona:
    const newFriend = profileDocument.addSubject({
        identifier: friendWebId
    });
    // Indicamos que el Subject es Una Persona
    newFriend.addRef(rdf.type, 'http://xmlns.com/foaf/0.1/person');

    // Le añadimos con su alias
    //newFriend.addString('http://xmlns.com/foaf/0.1/label', alias);

    //Añadimos un nuevo Subject de que Conocemos a la Persona (es amigo)
    const newKnown = profileDocument.addSubject({
        identifier: 'me'
    });

    newKnown.addRef('http://xmlns.com/foaf/0.1/knows',friendWebId)


    await profileDocument.save([newFriend,newKnown]);
}