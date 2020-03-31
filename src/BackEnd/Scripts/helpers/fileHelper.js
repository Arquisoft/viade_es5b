const auth = require("solid-auth-client");
const FC = require("solid-file-client");
const fc = new FC(auth);


export async function readFolder(route)
{
  let folder;
  await fc
    .readFolder(route)
    .then(content => {
      folder = content;
    })
    .catch((err) => (folder = null));
    return folder;
}
export async function moveFile(sourceURL,targetURL)
{
  let result=false;
  await fc
    .moveFile( sourceURL, targetURL )
    .then( ()=> {
      result=true;
    })
    .catch(err => (result = false));
    return result;
}
export async function deleteFile(sourceURL)
{
  let result=false;
  await fc
    .delete( sourceURL)
    .then( ()=> {
      result=true;
    })
    .catch(err => (result = false));
    return result;
}
