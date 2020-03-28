import { schema } from "rdf-namespaces";
import { fetchDocument } from 'tripledoc';
import Ruta from "../../../front-end/model/Ruta.js";
import Hito from "../../../front-end/model/Hito.js";

export async function readRouteFromUrl(url)
{
    let routeDoc;
    let ruta;
    await fetchDocument(url)
      .then(content => {
        routeDoc = content;
      })
      .catch(err => (routeDoc = null));

    if (routeDoc != null) {
        const route = routeDoc.getSubject("#ruta");

        let puntos = routeDoc.getSubjectsOfType(
        "http://arquisoft.github.io/viadeSpec/points"
        );

        ruta = new Ruta(
        route.getString(schema.name),
        [
            puntos[0].getDecimal(schema.latitude),
            puntos[0].getDecimal(schema.longitude)
        ],
        route.getString(schema.description)
        );
        ruta.setUUID(route.getString(schema.identifier));

        for (var e = 1; e < puntos.length; e++) {
            ruta.addHito(
                new Hito(
                puntos[e].getString(schema.name),
                puntos[e].getDecimal(schema.latitude),
                puntos[e].getDecimal(schema.longitude)
                )
            );
        } 
    }
    return ruta;
}