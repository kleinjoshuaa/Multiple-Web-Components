import showPage from "./showpage.js";

// Instantiate the SDK. CDN will expose splitio globally 
var factory = splitio({ 
    core: {
      authorizationKey: 'g95osp3c7epibjli3n60cjjtm4gjii8jjlp1',
      // key represents your internal user id, or the account id that 
      // the user belongs to. 
      // This could also be a cookie you generate for anonymous users
      key: (Math.random() + 1).toString(36).substring(7)
    }
  });
  // And get the client instance you'll use
  var client = factory.client();
//   const sdkReady = new Event("SDK_READY");
//   const sdkTimeout = new Event("SDK_TIMEOUT");

  client.on(client.Event.SDK_READY, function() {
    showPage()
  });

  client.on(client.Event.SDK_TIMED_OUT, function() {

    // show error or timeout page here
  });

  export default client