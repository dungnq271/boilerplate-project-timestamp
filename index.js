// index.js
// where your node app starts

// init project
let express = require("express");
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let timestamp = Date.parse(dateParam);

  // valid date
  if (!isNaN(timestamp)) {
    let date = new Date(dateParam);
    res.json({
      unix: timestamp,
      utc: date.toUTCString(),
    });
  }
  // timestamp
  else if (dateParam == +dateParam) {
    let date = new Date(Number(dateParam));
    res.json({
      unix: Number(dateParam),
      utc: date.toUTCString(),
    });
  } else if (dateParam === undefined) {
    let currentTimestamp = Date.now();
    let date = new Date(Number(currentTimestamp));
    res.json({ unix: currentTimestamp, utc: date.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment letiable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
