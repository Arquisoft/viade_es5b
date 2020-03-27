import { fetchDocument } from 'tripledoc';
const request = require('request')


export async function getInboxUrl(webId) {
  let profileDoc;
  await fetchDocument(webId)
  .then(content => {
    profileDoc = content;
  })
  .catch(err => (profileDoc = null));
  if(profileDoc!==null)
  {
    var profile = profileDoc.getSubject('#me');
    if(profile!==null)
    {
      var url = profile.getRef('http://www.w3.org/ns/ldp#inbox');
      console.log(url);
      return  url;
    }
  }
  return null;
}

export async function sendNotification(webId,targetWebId, type) {
  var inbox=await getInboxUrl(targetWebId);
  request({
    method: 'POST',
    uri: inbox,
    body: `@prefix as: <https://www.w3.org/ns/activitystreams#> .
          @prefix schema: <http://schema.org/> .
          <> a as:${type} ;
          schema:agent <${webId}> .`,
    headers: {
      'Content-Type': 'text/turtle'
    }
  });
}
export async function sendNotificationBody(webId,targetWebId, body) {
  var inbox=await getInboxUrl(targetWebId);
  request({
    method: 'POST',
    uri: inbox,
    body: body,
    headers: {
      'Content-Type': 'text/turtle'
    }
  });
}