const express = require("express");
const path = require("path");
const fileUpload = require('express-fileupload');
const axios = require("axios");
const { getItems, formSubmit } = require("./utils");
const { stripeCheckout } = require('./payment');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(fileUpload());

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});


app.post("/acknowledge", async (req, res) => {
  try {
    let formData = req.body;

    const listItems = JSON.parse(formData['items_list']);
    const items = getItems(listItems, formData);
    formData['items_list'] = JSON.stringify(items);

    const response = await formSubmit(formData);

    res.redirect(`/acknowledge?album=${encodeURIComponent(formData['album'])}&fname=${encodeURIComponent(formData['fname'])}&lname=${encodeURIComponent(formData['lname'])}&address=${encodeURIComponent(formData['address'])}&city=${encodeURIComponent(formData['city'])}&state=${encodeURIComponent(formData['state'])}&total=${encodeURIComponent(formData['grand_total'])}&payment=${encodeURIComponent(formData['payment'])}`);

  } catch (error) {
    res.status(500).json({
      message: `An error occurred: ${error.message}`,
    });
  }
});


app.get("/acknowledge", (req, res) => {
  const { album, fname, lname, address, city, state, total, payment } = req.query;

  res.render("acknowledge", {
    album,
    fname,
    lname,
    address,
    city,
    state,
    total,
    payment
  });
});

app.post("/checkout", async (req, res) => {
  let formData = req.body;
  if(formData['payment'] === 'stripe'){
    const payment_link = await stripeCheckout(formData['album'], parseFloat(formData['grand_total']));
    res.redirect(payment_link);
  }
});

app.get("/success", (req, res) => {
  res.send({
    data: "Success"
  });
});


app.get("/success", (req, res) => {
  res.send({
    data: "Cancelled"
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
