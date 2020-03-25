import { space, rdf, schema } from 'rdf-namespaces';
import { fetchDocument, createDocument } from 'tripledoc';

const auth = require('solid-auth-client')

export async function addFriend(newFriend) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }
    const friendsRoute = 'private/friends/' + amigo.nombre + '.ttl';
    const webId = session.webId;

    await newDocument(webId, friendsRoute);
    await insertData(webId, friendsRoute, newFriend);

}

//https://github.com/solid/solidproject.org/blob/staging/_posts/for-developers/apps/first-app/2019-01-01-04_data-model.md
//https://vincenttunru.gitlab.io/tripledoc/
async function newDocument(webId, friend) {

    const profileDocument = await fetchDocument(webId);
    const profile = profileDocument.getSubject(webId);

    // Get the root URL of the user's Pod:
    const storage = profile.getRef(space.storage);

    // Decide at what URL within the user's Pod the new Document should be stored:
    const userListRef = storage + friend;
    // Create the new Document:
    const userList = createDocument(userListRef);
    await userList.save();
}
async function insertData(webId, friendsRoute, friend) {
    const profileDocument = await fetchDocument(webId);
    const routeDocument = await fetchDocument(profileDocument.getSubject(webId).getRef(space.storage) + friendsRoute);


    // Initialise the new Subject:
    const newFriend = routeDocument.addSubject({
        identifier: friend,
        identifierPrefix: 'Name:'
    });
    //Guardar
    await routeDocument.save([newFriend]);

    // Initialise the new Subject:
    const saveNewFeiend = routeDocument.addSubject({
        identifier: 'friend'
    });
    saveNewFeiend.addString(schema.name, friend);
    await routeDocument.save([saveNewFeiend]);
}

