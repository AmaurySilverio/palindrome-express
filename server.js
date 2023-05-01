const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // this is now built into express, we won't need it in the future-
const MongoClient = require("mongodb").MongoClient; // how we connect to db

var db, collection;

const url =
  "mongodb+srv://amaurycodes:Cofwp0oLYdFZk01x@cluster0.9qj4jet.mongodb.net/?retryWrites=true&w=majority";
const dbName = "palindrome";

app.listen(3002, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db(dbName);
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("userInput")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { palindromes: result });
    });
});

app.post("/palindromeInQuestion", (req, res) => {
  let word = req.body.word.replace(/\s/g, "");
  //let newWord = req.body.word.replace(/\s/g, "");
  let answer = false;
  if (word.toLowerCase() === word.toLowerCase().split("").reverse().join("")) {
    answer = true;
  }
  db.collection("userInput").insertOne(
    { word: word, answer: answer },
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});

app.delete("/palindromeInQuestion", (req, res) => {
  console.log(req.body.word);
  db.collection("userInput").findOneAndDelete(
    { word: req.body.word },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});
