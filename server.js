const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const { getItems, formSubmit } = require("./utils");
const { stripeCheckout } = require("./payment");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  const allowedPaths = ["/", "/acknowledge", "/checkout", "/success", "/cancel"];
  
  if (!allowedPaths.includes(req.path)) {
    return res.redirect("/");
  }
  next();
});

app.get("/", (req, res) => res.render("index", { error: null }));

app.post("/acknowledge", async (req, res) => {
  try {
    const formData = req.body;
    const listItems = JSON.parse(formData["items_list"]);
    const items = getItems(listItems, formData);
    formData["items_list"] = JSON.stringify(items);
    await formSubmit(formData);

    res.redirect(
      `/acknowledge?album=${encodeURIComponent(formData["album"])}&fname=${encodeURIComponent(
        formData["fname"]
      )}&lname=${encodeURIComponent(formData["lname"])}&address=${encodeURIComponent(
        formData["address"]
      )}&city=${encodeURIComponent(formData["city"])}&state=${encodeURIComponent(
        formData["state"]
      )}&total=${encodeURIComponent(formData["grand_total"])}&payment=${encodeURIComponent(
        formData["payment"]
      )}`
    );
  } catch (error) {
    res.render("index", { error: error.message });
  }
});

app.get("/acknowledge", (req, res) => {
  const { album, fname, lname, address, city, state, total, payment } = req.query;
  res.render("acknowledge", { album, fname, lname, address, city, state, total, payment });
});

app.post("/checkout", async (req, res) => {
  try {
    const formData = req.body;
    if (formData["payment"] === "stripe") {
      const paymentLink = await stripeCheckout(formData["album"], parseFloat(formData["grand_total"]));
      return res.redirect(paymentLink);
    }
    res.redirect("/");
  } catch (error) {
    res.render("index", { error: error.message });
  }
});

app.get("/success", (req, res) => res.render("success"));
app.get("/cancel", (req, res) => res.render("cancel"));

app.use((err, req, res, next) => {
  res.render( "index", { error: err.message });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
