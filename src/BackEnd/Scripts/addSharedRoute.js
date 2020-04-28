import { rdf, space, schema } from "rdf-namespaces";
import { fetchDocument, createDocument } from "tripledoc";
import { existsFileInFolder } from "./helpers/fileHelper";

const auth = require("solid-auth-client");

export async function addSharedRoute (friendWebId, routeUrl, routeUUID) {
	var result = false;
	const session = await auth.currentSession();
	if (!session) { window.location.href = "/login"; }
	const route = "private/viade_es5b/friendSharedRoutes.ttl";
	const webId = session.webId;

	const profileDocument = await fetchDocument(webId);
	const profile = profileDocument.getSubject(webId);

	// Get the root URL of the user"s Pod:
	const storage = profile.getRef(space.storage);

	var exists = await existsFileInFolder(storage + "private/viade_es5b", "friendSharedRoutes.ttl");
	// si no existe el documento lo creo
	if (!exists) { await newDocument(storage + route); }
	// agrego la ruta y quien me lo compartio al fichero
	result = await insertData(storage + route, friendWebId, routeUrl, routeUUID);
	return result;
}
async function newDocument (route) {
	// Create the new Document:
	const sharedRoutesDocument = createDocument(route);
	await sharedRoutesDocument.save();
}
async function insertData (route, friend, routeUrl, routeUUID) {
	const sharedRoutesDocument = await fetchDocument(route);
	// Compruebo si esta repetida, si lo esta no hago nada
	var repeated = false;
	const rutas = sharedRoutesDocument.getAllSubjectsOfType("http://arquisoft.github.io/viadeSpec/route");
	for (var e = 0; e < rutas.length; e++) {
		if (rutas[e].getRef(schema.url) === routeUrl) {
			repeated = true;
			break;
		}
	}
	if (!repeated) {
		// Initialise the new Subject:
		const newShare = sharedRoutesDocument.addSubject();

		newShare.addRef(schema.agent, friend);
		newShare.addRef(schema.url, routeUrl);
		newShare.addString(schema.identifier, routeUUID);
		newShare.addRef(rdf.type, "http://arquisoft.github.io/viadeSpec/route");

		await sharedRoutesDocument.save([newShare]);
		return true;
	}
	return false;
}
