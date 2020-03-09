import { createDocument } from 'tripledoc';
import { space, rdf, solid, schema } from 'rdf-namespaces';

export async function initialiseRoutesList(profile, typeIndex) {
  // Get the root URL of the user's Pod:
  const storage = profile.getRef(space.storage);

  // Decide at what URL within the user's Pod the new Document should be stored:
  const routesListRef = storage + 'private/routes.txt';
  // Create the new Document:
  const routesList = createDocument(routesListRef);
  await routesList.save();

  // Store a reference to that Document in the public Type Index for `schema:TextDigitalDocument`:
  const typeRegistration = typeIndex.addSubject();
  typeRegistration.addRef(rdf.type, solid.TypeRegistration)
  typeRegistration.addRef(solid.instance, routesList.asRef())
  typeRegistration.addRef(solid.forClass, schema.TextDigitalDocument)
  await typeIndex.save([ typeRegistration ]);

  // And finally, return our newly created (currently empty) notes Document:
  return routesList;
}