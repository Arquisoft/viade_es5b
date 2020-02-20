//INSTALACIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON

//npm install solid-file-client
//change to the solid-file-client folder
//npm install   // this pulls in dependencies
//npm run build // this creates the executables
//Once installed the executables will be found within the solid-file-client folder :
//dist/node/solid-file-client.bundle.js      // for node scripts
//dist/window/solid-file-client.bundle.js   // for browser scripts


const auth = require('solid-auth-cli')
const FC   = require('solid-file-client')
const fc   = new FC( auth )
async function run(){
    let session = await auth.currentSession()
    if (!session) { session = await auth.login() }
    console.log(`Logged in as ${session.webId}.`)
    if( await fc.itemExists( someUrl ) ){
        let content = await fc.readFile( someUrl )
        // ... other file methods
        // ... and/or other auth methods
    }
}
run()