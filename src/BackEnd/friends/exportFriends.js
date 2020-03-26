const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
export async function addFriend(newFriend) {
    let session = await auth.currentSession();
    if (!session) { window.location.href = "/login"; }
}