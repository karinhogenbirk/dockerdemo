const app = require("express")();
var path = require("path");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`I am listening on PORT ${PORT}`);
});

app.get("/contact", (req, res) => {
  res.json({ message: "karinhogenbirk93@gmail.com" });
});
