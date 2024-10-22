require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeCheckout = async (product_name, amount) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product_name },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5000/success',
      cancel_url: 'http://localhost:5000/cancel',
    });

    return session.url;
  } catch (error) {
    throw new Error('Stripe Payment processing failed. Please try again later.');
  }
};

const partiallyCheckout = (director_name, location, amount) => {
  try {
    const partially_uri = `https://partial.ly/checkout?offer=4c2a7f12-0883-4905-a0c1-5e3cd9bebe69&amount=${encodeURIComponent(amount)}&meta[description]=make_link&meta[Salesperson]=${encodeURIComponent(director_name)}&meta[Location]=${encodeURIComponent(location)}&referral_source=shared_link`;

    return partially_uri;
  } catch (error) {
    throw new Error('Partial.ly Payment processing failed. Please try again later.');
  }
};


module.exports = { stripeCheckout, partiallyCheckout };
