import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCheckout = async (product_name, amount) => {
  const session = await stripe.checkout.sessions.create({
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
    success_url: "http://localhost:5000/success",
    cancel_url: "http://localhost:5000/cancel",
  });

  return session.url;
};

const partiallyCheckout = (director_name, location, amount) => {
  const partially_uri = `https://partial.ly/checkout?offer=4c2a7f12-0883-4905-a0c1-5e3cd9bebe69&amount=${encodeURIComponent(
    amount
  )}&meta[description]=make_link&meta[Salesperson]=${encodeURIComponent(
    director_name
  )}&meta[Location]=${encodeURIComponent(
    location
  )}&referral_source=shared_link`;

  return partially_uri;
};

const checkout = async (req, res) => {
  const formData = req.body;

  if (formData["payment_method"] === "stripe") {
    const paymentLink = await stripeCheckout(
      formData["album"],
      parseFloat(formData["grand_total"])
    );
    res.redirect(paymentLink);
  } else if (formData["payment_method"] === "partial.ly") {
    const paymentLink = partiallyCheckout(
      formData["director"],
      formData["locaiton"],
      parseFloat(formData["grand_total"])
    );
    res.redirect(paymentLink);
  } else {
    res.redirect("/");
  }
};

export { checkout };
