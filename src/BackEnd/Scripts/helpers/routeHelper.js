import { schema } from "rdf-namespaces";
import { fetchDocument } from 'tripledoc';
import {readFolder,existsFile} from "../helpers/fileHelper";
import {getPersonaByWebId} from "../helpers/personHelper";
import Ruta from "../../../front-end/model/Ruta.js";
import Hito from "../../../front-end/model/Hito.js";
import Comentario from "../../../front-end/model/Comentario.js";

export async function readRouteFromUrl(url)
{
    let routeDoc;
    let ruta = null;
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
        
        let comentarios = routeDoc.getSubjectsOfType(
            "http://arquisoft.github.io/viadeSpec/userComment"
            );
        for (let i = 0; i < comentarios.length; i++) {
            let comentario = new Comentario(comentarios[i].getDateTime(schema.datePublished),comentarios[i].getString(schema.text));
            let autor= await getPersonaByWebId(comentarios[i].getRef(schema.author));
            comentario.setAutor(autor);
            ruta.addComentario(comentario);
        }
        let ficheros = routeDoc.getSubjectsOfType(schema.MediaObject);
        for (let i = 0; i < ficheros.length; i++) {
            let fichero = ficheros[i].getRef(schema.contentUrl)
            ruta.addFichero(fichero);
          }       
    }
    return ruta;
}
export async function findRouteURL(folderUrl,uuid)
{
    let folder= await readFolder(folderUrl);
    if (folder) 
    {
        for (var i = 0; i < folder.files.length; i++) 
        {
            //console.log(folder.files[i].url)
            let routeDoc;
            await fetchDocument(folder.files[i].url).then((content) => {
                routeDoc=content;
            })
            .catch(err => routeDoc=null);

            if(routeDoc!=null)
            {
                var route = routeDoc.getSubject('#ruta');
                var ID=route.getString(schema.identifier);
                if(ID===uuid)
                {
                    return folder.files[i].url;
                }
            }
        };
    }
    return null;
}
export async function getSharedRouteFriends(storage,routeUUID) {
    var result=[];
    var exists=await existsFile(storage + 'private','mySharedRoutes.ttl');
    if(exists)
    {
        const mySharedRoutesDocument = await fetchDocument(storage + 'private/mySharedRoutes.ttl');
        
        let rutas = mySharedRoutesDocument.getAllSubjectsOfType('http://arquisoft.github.io/viadeSpec/route');
        for (var e = 0; e < rutas.length; e++) {
          //Miro a ver si estoy compartiendo esta ruta
          if(rutas[e].getLiteral(schema.identifier)===routeUUID)
          {
              //Si la estoy compartiendo entonces saco los amigos con los que la comparto
              let amigos=rutas[e].getAllRefs(schema.agent)
              for (var i = 0; i < amigos.length; i++) {
                  //los añado a result
                  result = [...result, amigos];
              }
              //Ya encontre lo que busco asi que salgo
              break;
          }
        }
    }
    return result;
}
