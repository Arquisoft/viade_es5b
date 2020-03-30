import {findRouteURL} from "./helpers/routeHelper";
import {getRootStorage} from "./helpers/fileHelper";
import {listRoutes} from "./listRoutes";


const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);

export async function deleteRoute(uuid) {
    var result=[];
    let session = await auth.currentSession();
    if (!session) {window.location.href = "/login";}
    let storage= await getRootStorage(session.webId);
    let url= await findRouteURL(storage + 'private/routes/',uuid);
    //Si no la encuentro la busco en publico
    if (url===null) 
        url= await findRouteURL(storage + 'public/routes/',uuid);
    //Si la encuentro la borro
    if (url!==null) 
    {
        fc.delete(url); 
        result = await listRoutes();
    }
    return result;
}

