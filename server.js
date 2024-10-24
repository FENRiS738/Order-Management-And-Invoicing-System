import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv';
import session from 'express-session';


// import { getItems, formSubmit, generateToken, verifyToken } from "./utils.js";
// import { stripeCheckout, partiallyCheckout } from "./payment.js";
import { confirm_router, customer_router, order_router, acknowledge_router } from './routes/index.js';
import { home } from './views/index.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use("/static", express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use('/customers', customer_router);
app.use('/orders', order_router);
app.use('/confirm', confirm_router);
app.use('/acknowledge', acknowledge_router);

app.get("/", (req, res) => {
  let error = req.query["error"];
  let data = { error: null };
  if (error !== undefined) {
    data["error"] = error;
  }
  res.send(home(data));
});

// app.post("/acknowledge", async (req, res) => {
//   try {
//     const formData = req.body;

//     const listItems = JSON.parse(formData["items_list"]);
//     const items = getItems(listItems, formData);
//     formData["items_list"] = JSON.stringify(items);
//     const pdf_url = await formSubmit(formData);
//     formData["invoice"] = pdf_url;

//     let token = generateToken(formData);
//     const fullUrl = `${req.protocol}://${req.get(
//       "host"
//     )}/acknowledge?token=${encodeURIComponent(token)}`;

//     res.render("url", { url: fullUrl, invoice: pdf_url });
//   } catch (error) {
//     res.redirect(`/?error=${encodeURIComponent(error.message)}`);
//   }
// });

// app.get("/acknowledge", (req, res) => {
//   const { token } = req.query;

//   const { album, fname, lname, art_director, locaiton, grand_total, payment, invoice } =
//     verifyToken(token);
//   res.render("acknowledge", {
//     album,
//     fname,
//     lname,
//     art_director,
//     locaiton,
//     grand_total,
//     payment,
//     invoice
//   });
// });

// app.post("/checkout", async (req, res) => {
//   try {
//     const formData = req.body;

//     if (formData["payment"] === "stripe") {
//       const paymentLink = await stripeCheckout(
//         formData["album"],
//         parseFloat(formData["grand_total"])
//       );
//       res.redirect(paymentLink);
//     } else if (formData["payment"] === "partial.ly") {
//       const paymentLink = partiallyCheckout(
//         formData["art_director"],
//         formData["locaiton"],
//         parseFloat(formData["grand_total"])
//       );
//       res.redirect(paymentLink);
//     } else {
//       res.redirect("/");
//     }
//   } catch (error) {
//     res.redirect(`/?error=${encodeURIComponent(error.message)}`);
//   }
// });

// app.get("/success", (req, res) => res.render("success"));
// app.get("/cancel", (req, res) => res.render("cancel"));

app.use((err, req, res, next) => {
  res.redirect(`/?error=${encodeURIComponent(err.message)}`);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
