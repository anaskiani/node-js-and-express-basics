require('dotenv').config();
let express = require("express");
let app = express();

console.log("Hello World");
// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  res.json({ message: "HELLO JSON" });
  if(process.env.MESSAGE_STYLE === "allCap"){
    response = "Hello Json".toUpperCase();
  } else {
    response = "Hello Json";      
  }
});

module.exports = app;
