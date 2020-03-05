import { fetchDocument } from 'tripledoc';
import { solid, schema } from 'rdf-namespaces';

export async function getRoutesList(profile) {
  /* 1. Check if a Document tracking our notes already exists. */
  const publicTypeIndexRef = profile.getRef(solid.publicTypeIndex);
  const publicTypeIndex = await fetchDocument(publicTypeIndexRef);
  const notesListEntry = publicTypeIndex.findSubject(solid.forClass, schema.routesList);

  /* 2. If it doesn't exist, create it. */
  if (routesList === null) {
    // We will define this function later:
    return initialiseNotesList(profile, routesList);
  }

  /* 3. If it does exist, fetch that Document. */
  const notesListRef = routesList.getRef(solid.instance);
  return await fetchDocument(notesListRef);
}