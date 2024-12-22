import showPage from "./showpage.js";
import updatePage from "./updatepage.js";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Instantiate the SDK. CDN will expose splitio globally 
async function getAuthKey() {
    const response = await fetch('./splitClientApiKey');
    return await response.text();
}

const authKey = await getAuthKey();
console.log('[split.js] using authKey ' + authKey);

const key = uuidv4();
console.log('[split.js] using key ' + key);

const factory = splitio({ 
    core: {
      authorizationKey: authKey,
      // key represents your internal user id, or the account id that 
      // the user belongs to. 
      // This could also be a cookie you generate for anonymous users
      key: key 
    },
    debug: false
});

// And get the client instance you'll use
console.log('[split.js] Initializing SDK client');

const client = factory.client();

client.on(client.Event.SDK_READY, function() {
  console.log('[split.js] SDK_READY');
  showPage()
  updatePage()
});

client.on(client.Event.SDK_UPDATE, function() {
  console.log('[split.js] SDK_UPDATE');
  updatePage()
});

client.on(client.Event.SDK_READY_TIMED_OUT, function() {
  // show error or timeout page here
  console.log('[split.js] SDK Timed Out! - check API key')
});

console.log('[split.js] finish initializing SDK client');
export default client
