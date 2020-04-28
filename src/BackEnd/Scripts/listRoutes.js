import { space } from "rdf-namespaces";
import { fetchDocument } from "tripledoc";
import { readFolder } from "./helpers/fileHelper";
import { readRouteFromUrl } from "./helpers/routeHelper";
const auth = require("solid-auth-client");

export async function listRoutes () {
	const session = await auth.currentSession();
	if (!session) {
		window.location.href = "/login";
	}

	const profileDocument = await fetchDocument(session.webId);
	const profile = profileDocument.getSubject(session.webId);

	// Get the root URL of the user"s Pod:
	const storage = profile.getRef(space.storage);
	var result = [];

	result = await readRoutes(storage + "private/viade_es5b/routes/");

	return result;
}
async function readRoutes (folderRoute) {
	const folder = await readFolder(folderRoute);
	var result = [];
	if (folder) {
		for (var i = 0; i < folder.files.length; i++) {
			const ruta = await readRouteFromUrl(folder.files[i].url);
			if (ruta != null) { result = [...result, ruta]; }
		}
	}
	return result;
}
