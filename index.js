let MongoClient = require("mongodb").MongoClient;
const express = require("express");
let path = require("path");
let fs = require("fs");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/images/karinhog.png", function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/karinhog.png"));
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(img, "binary");
});

app.listen(PORT, () => {
  console.log(`I am listening on PORT ${PORT}`);
});

app.get("/contact", (req, res) => {
  res.json({ message: "karinhogenbirk93@gmail.com" });
});

let mongoUrlLocal = "mongodb://mongoadmin:secret@localhost:27017";
let mongoUrlDocker = "mongodb://mongoadmin:secret@mongodb";
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
let databaseName = "messages";

app.post("/send-message", function (req, res) {
  let senderObj = req.body;
  console.log(senderObj);

  MongoClient.connect(
    mongoUrlLocal,
    mongoClientOptions,
    function (err, client) {
      if (err) throw err;

      let db = client.db(databaseName);
      senderObj["senderid"] = 1;

      let newvalues = { $set: senderObj };
      db.collection("messages").insertOne(
        newvalues,
        { upsert: true },
        function (err, res) {
          if (err) throw err;
          client.close();
        }
      );
    }
  );
  // Send response
  res.send(senderObj);
});
