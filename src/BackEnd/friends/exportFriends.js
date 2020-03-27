const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
export async function addFriend(newFriend) {
    let session = await auth.currentSession();
    if (!session) {
        window.location.href = "/login";
        const webId = session.webId;
        await getFriends(webId);
    }
    async function getFriends(webId) {
        // Set up a local data store and associated data fetcher
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store);
        const person = $('#profile').val();
        await fetcher.load(person);
        const friends = store.each($rdf.sym(person), FOAF('knows'));
        $('#friends').empty();
        friends.forEach(async (friend) => {
            await fetcher.load(friend);
            const fullName = store.any(friend, FOAF('name'));
            $('#friends').append(
                $('<li>').append(
                    $('<a>').text(fullName && fullName.value || friend.value)
                        .click(() => $('#profile').val(friend.value))
                        .click(loadProfile)));
        });
    }
}