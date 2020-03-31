import {getNotificationDocuments} from "./helpers/notificationHelper";
import { schema } from "rdf-namespaces";
import {findRouteURL} from "./helpers/routeHelper";
import {getRootStorage,deleteFile} from "./helpers/fileHelper";
import {addSharedRoute} from "./addSharedRoute";
import {getPersonaByWebId} from "./helpers/personHelper";
import {readRouteFromUrl} from "./helpers/routeHelper";

import Notificacion from "../../front-end/model/Notificacion.js";


const auth = require("solid-auth-client");


//Comprueba todos los mensajes del usuario, busca los que sean del tipo ruta compartida
//añade esas rutas compartidas al fichero de compartidas
//dicho fichero contendra <uuid ruta> <perfil amigo>
//devuelve la ruta y el amigo que la compartio contigo

export async function processSharedRoutes() {
    let session = await auth.currentSession();
    var result = [];
    if (session) { 
        let documents=await getNotificationDocuments(session.webId);
        if(documents.length>0)
        {
            for(let i=0;i<documents.length;i++)
            {
                var message = documents[i].getSubject("");
                var action = message.getString(schema.action);
                console.log('accion',action);
                ///Si es del tipo shareRoute es que quiere compartir una ruta con nosotros
                if(action === 'shareRoute')
                {
                    //Comprobamos si existe de verdad la ruta en la parte publica del usuario, si existe
                    //continuamos
                    let friendWebId=message.getRef(schema.agent);
                    let storage = await getRootStorage(friendWebId);
                    let routeUrl= await findRouteURL(storage + 'public/routes/',message.getString(schema.identifier));
                    if(routeUrl!==null){
                        console.log('url',routeUrl);
                        //Si lo encontro entonces insertamos en el apartado de rutas compartidas y borramos el mensaje
                        addSharedRoute(friendWebId,routeUrl);
                        //Añadimos al resultado una nueva notificacion
                        var ruta=await readRouteFromUrl(routeUrl)
                        var persona=await getPersonaByWebId(friendWebId)
                        result = [...result,new Notificacion(persona.getNombre() + " te ha Compartido una ruta!","Ruta : " + ruta.getNombre())];
                    }
                    //borramos la notificacion
                    deleteFile(documents[i].asRef());
                }
                //Si es del tipo commentRoute es que alguien ha comentado en una ruta compartida
                if(action === 'commentRoute')
                {
                    //Comprobamos si existe de verdad la ruta en la parte publica del usuario, si existe
                    //continuamos
                    let friendWebId=message.getRef(schema.agent);
                    let storage = await getRootStorage(friendWebId);
                    let routeUrl= await findRouteURL(storage + 'public/routes/',message.getString(schema.identifier));
                    if(routeUrl!==null){
                        console.log('url',routeUrl);
                        //Si la encontro entonces mostramos una notificacion al usuario
                        var ruta=await readRouteFromUrl(routeUrl)
                        var persona=await getPersonaByWebId(friendWebId)
                        result = [...result,new Notificacion(persona.getNombre() + " ha comentado","En "+ruta.getNombre()+": "+message.getString(schema.comment) )];

                    }
                    //borramos la notificacion
                    deleteFile(documents[i].asRef());
                }
            }
        }
    }
    return result;
}