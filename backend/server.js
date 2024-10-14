const express = require("express");
const path = require("path");
const fileUpload = require('express-fileupload');
const axios = require("axios");

const PORT = 5000 || process.evn.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.redirect("/acknowledge");
});

app.get("/acknowledge", (req, res) => {
  res.render("acknowledgement");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
