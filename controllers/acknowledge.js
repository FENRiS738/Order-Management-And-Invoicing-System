import dotenv from "dotenv";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import connectToDB from "../data/database.js";
import { acknowledge_template } from "../views/index.js";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  const data = jwt.verify(token, secretKey);
  return data;
};

const stripeCheckout = async (req, product_name, amount, metadata) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "affirm"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: product_name },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/success`,
    cancel_url: `${req.protocol}://${req.get("host")}/cancel`,
    payment_intent_data: {
      metadata,
    },
  });
  return session.url;
};

const partiallyCheckout = (director_name, location, amount) => {
  const partially_uri = `https://partial.ly/checkout?offer=641b34d9-6f87-48bd-a155-128d4a5f85df&amount=${encodeURIComponent(
    amount
  )}&meta[description]=make_link&meta[Salesperson]=${encodeURIComponent(
    director_name
  )}&meta[Location]=${encodeURIComponent(
    location
  )}&referral_source=shared_link`;

  return partially_uri;
};


const getTokenById = async (id) => {
  const conn = await connectToDB();
  const objectId = new ObjectId(id);
  const result = await conn.database.collection("tokens").findOne({ _id: objectId });
  return result.token;
};

const getAcknowledgeData = async (req, res) => {
  const { q } = req.query;
  const token = await getTokenById(q)
  const {
    album,
    fname,
    lname,
    director,
    location,
    grand_total,
    payment_method,
    invoice,
  } = verifyToken(token);
  res.send(
    acknowledge_template({
      album,
      fname,
      lname,
      director,
      location,
      grand_total,
      payment_method,
      invoice,
    })
  );
};

const checkout = async (req, res) => {
  const formData = req.body;

  if (formData["payment_method"] === "stripe") {
    const paymentLink = await stripeCheckout(
      req,
      formData["album"],
      parseFloat(formData["grand_total"]),
      formData
    );
    res.redirect(paymentLink);
  } else if (formData["payment_method"] === "partial.ly") {
    const paymentLink = partiallyCheckout(
      formData["director"],
      formData["location"],
      parseFloat(formData["grand_total"])
    );
    res.redirect(paymentLink);
  } else {
    res.redirect("https://bluebirdportraits.com/");
  }
};

export { checkout, getAcknowledgeData };
