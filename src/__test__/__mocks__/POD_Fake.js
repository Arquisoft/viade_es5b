export default class BackMain_Fake {
    // static listarRutas () {
    //   return listRoutes()
    // }

    static añadirRuta(Ruta) {
        return addRoute(Ruta)
    }

}
var UUID_fake=1;
var rutas = []
export async function addRoute (ruta) {

  const route = "private/viade_es5b/routes/" + UUID_fake + ".ttl"
  const webId = UUID_fake;
  result =await newDocument(UUID_fake, route)
  result =await insertData(UUID_fake, route, ruta)
  return result;
}

async function newDocument (webId, route) {
  const profileDocument = await fetchDocument(webId)
  const profile = profileDocument.getSubject(webId)

  // Get the root URL of the user"s Pod:
  const storage = profile.getRef(space.storage)

  // Decide at what URL within the user"s Pod the new Document should be stored:
  const routesListRef = storage + route
  // Create the new Document:
  const routesList = createDocument(routesListRef)
  await routesList.save()
  return true;
}
async function insertData (webId, route, ruta) {
  const profileDocument = await fetchDocument(webId)
  const routeDocument = await fetchDocument(profileDocument.getSubject(webId).getRef(space.storage) + route)

  if (ruta.getInicio()) {
    for (var i = 0; i <= ruta.getHitos().length; i++) {
      // Initialise the new Subject:
      const newPoint = routeDocument.addSubject({
        identifier: i,
        identifierPrefix: "point"
      })
      if (i === 0) {
        if (ruta.getInicio().nombre != null) newPoint.addString(schema.name, ruta.getInicio().nombre)
        newPoint.addDecimal(schema.latitude, ruta.getInicio()[0])
        newPoint.addDecimal(schema.longitude, ruta.getInicio()[1])
        newPoint.addInteger("http://arquisoft.github.io/viadeSpec/order", i)

      } else {
        newPoint.addString(schema.name, ruta.getHitos()[i - 1].getNombre())
        newPoint.addDecimal(schema.latitude, ruta.getHitos()[i - 1].getLat())
        newPoint.addDecimal(schema.longitude, ruta.getHitos()[i - 1].getLong())
        newPoint.addInteger("http://arquisoft.github.io/viadeSpec/order", i)
      }

      newPoint.addRef(rdf.type, "http://arquisoft.github.io/viadeSpec/points")
      await routeDocument.save([newPoint])
    }
  }

  // Initialise the new Subject:
  const newRoute = routeDocument.addSubject({
    identifier: "ruta"
  })

  // Indicate that the Subject is a schema:TextDigitalDocument:
  newRoute.addRef(rdf.type, "http://arquisoft.github.io/viadeSpec/route")

  newRoute.addString(schema.name, ruta.getNombre())
  newRoute.addString(schema.description, ruta.getDescripcion())
  newRoute.addString(schema.identifier, ruta.getUUID())
  newRoute.addRef("http://arquisoft.github.io/viadeSpec/points", "http://arquisoft.github.io/viadeSpec/points")

  await routeDocument.save([newRoute])
  return true;
}
