let dotenv = require("dotenv").config();
let express = require("express");
let app = express();
const string = req.method + " " + req.path +  " - " + req.ip;
let logger = (req, res, next) => {
  console.log(res.send(string));
  next();
}

app.use(logger);

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


module.exports = app;
