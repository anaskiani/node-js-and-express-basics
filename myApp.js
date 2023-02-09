let express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
let app = express();
// let logger = (req, res, next) => {
//   // let string = `${req.method} ${req.path} - ${req.ip} `;
//   console.log( `${req.method} ${req.path} - ${req.ip} `);
//   next();
// };

// app.use(logger);
// app.use(function middleware(req, res, next) {
//   console.log(req.method + " " + req.path + "-" + req.ip);
//   next();
// });
app.use(function middleware(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

console.log("Hello World");
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  console.log(process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "HELLO JSON".toUpperCase();
  } else {
    response = "Hello json";
  }
  res.json({ message: response });
});
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word,
  });
});
app.get("/name", (req, res) => {
  const { first, last } = req.query;
  const name = `${first} ${last}`;
  res.json({ name });
});

module.exports = app;
