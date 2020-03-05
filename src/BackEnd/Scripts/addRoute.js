import{ruta} from '../Models/Ruta.js'
const auth = require('solid-auth-client')

export async function addRoute() {
    auth.fetch('https://timbl.com/timbl/Public/friends.ttl')
  .then(console.log);
}

