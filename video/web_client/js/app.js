let sessionId;
let token;

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here and change ngrok link
var SERVER_BASE_URL = "https://52ad10f0.ngrok.io";
fetch(SERVER_BASE_URL + "/session")
  .then((response) => {
    return response.json();
  })
  .then(function (res) {
    apiKey = res.apiKey;
    sessionId = res.currentSessionId;
    token = res.currentToken;
    console.log(res);
    initializeSession();
  })
  .catch(handleError);

// 3. Complete according to the tutorial
function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  var publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
