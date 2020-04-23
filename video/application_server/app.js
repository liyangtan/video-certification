const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get("port"), function () {
  console.log("Listening on port", app.get("port"));
});

var apiKey = "API_KEY";
var apiSecret = "API_SECRET";
var OpenTok = require("opentok"),
  opentok = new OpenTok(apiKey, apiSecret);
app.get("/", (req, res) => {
  res.send("Hello world");
});
// Set up webhook endpoint for front end to call!
// Creates a new session when called! Front end needs to check if there's an existing sessionId. T
// This can be done through cookies encryption, react context or redux state management
app.get("/session", function (req, res, next) {
  var sessionId = "";
  var token = " ";
  // Create a session
  opentok.createSession(function (err, session) {
    if (err) return console.log(err);
    sessionId = session.sessionId;

    //session.generateToken() needs to be inside of opentok! Initializing it as a new obj throws in an error
    token = session.generateToken({
      role: "moderator",
      expireTime: new Date().getTime() / 1000 + 1 * 60 * 60, // 1 day
      data: "name=Johnny",
      initialLayoutClassList: ["focus"],
    });

    /* Create token and return all required values to client  */
    if (token) {
      res.json({
        currentToken: token,
        currentSessionId: sessionId,
        apiKey: apiKey,
      });
      console.log(token, apiKey, sessionId);
      //res.send({ currentToken: token, currentSessionId: sessionId, apiKey:  apiKey });
    } else {
      console.log(" Error occurred when generating token using session Id");
      res.json({ currentToken: "", currentsessionId: "" });
      //res.send({ currentToken: "", currentsessionId: ""  })
    }
  });
});

/* STEP 4
  Parse incoming events - configure your Session Monitoring url in TKBX dashboard... Inspect the events!
  */
app.get("/events", function (req, res, next) {
  console.log("EVENT CALLBACK: ", JSON.stringify(req.body));
  res.json({ incomingevents: JSON.stringify(req.body) });
});
module.exports = app;
