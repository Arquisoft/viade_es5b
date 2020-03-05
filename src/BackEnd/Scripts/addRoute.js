import{ruta} from '../Models/Ruta.js'
const auth = require('solid-auth-client')

export async function addRoute() {
    auth.trackSession(session => {
        //si no esta logueado lo redirijo al login.
        if (!session)
            window.location.href = "/login";
        //si esta logueado guardo la ruta
        else
          console.log(`The user is ${session.webId}`)
      })
}

