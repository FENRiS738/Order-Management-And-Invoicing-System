const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const { getItems, formSubmit, generateToken, verifyToken } = require("./utils");
const { stripeCheckout, partiallyCheckout } = require("./payment");
const { error } = require("console");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// app.use((req, res, next) => {
//   const allowedPaths = [
//     "/",
//     "/acknowledge",
//     "/checkout",
//     "/success",
//     "/cancel",
//   ];

//   if (!allowedPaths.includes(req.path)) {
//     return res.redirect("/");
//   }
//   next();
// });

app.get("/", (req, res) => {
  let error = req.query["error"];
  let data = { error: null };
  if (error !== undefined) {
    data["error"] = error;
  }
  res.render("index", data);
});

app.post("/acknowledge", async (req, res) => {
  try {
    const formData = req.body;

    const listItems = JSON.parse(formData["items_list"]);
    const items = getItems(listItems, formData);
    formData["items_list"] = JSON.stringify(items);

    await formSubmit(formData);

    let token = generateToken(formData);
    const fullUrl = `${req.protocol}://${req.get('host')}/acknowledge?token=${encodeURIComponent(token)}`;

    res.render("url", { url: fullUrl });
  } catch (error) {
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
});

app.get("/acknowledge", (req, res) => {
  const { token } = req.query;

  const { album, fname, lname, art_director, locaiton, grand_total, payment } =
    verifyToken(token);
  res.render("acknowledge", {
    album,
    fname,
    lname,
    art_director,
    locaiton,
    grand_total,
    payment,
  });
});

app.post("/checkout", async (req, res) => {
  try {
    const formData = req.body;

    if (formData["payment"] === "stripe") {
      const paymentLink = await stripeCheckout(
        formData["album"],
        parseFloat(formData["grand_total"])
      );
      res.redirect(paymentLink);
    } else if (formData["payment"] === "partial.ly") {
      const paymentLink = partiallyCheckout(
        formData["art_director"],
        formData["locaiton"],
        parseFloat(formData["grand_total"])
      );
      res.redirect(paymentLink);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
});

app.get("/success", (req, res) => res.render("success"));
app.get("/cancel", (req, res) => res.render("cancel"));

app.use((err, req, res, next) => {
  res.redirect(`/?error=${encodeURIComponent(err.message)}`);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
