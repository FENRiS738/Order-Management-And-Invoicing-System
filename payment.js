require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeCheckout = async (product_name, price) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: product_name },
            unit_amount: Math.round(price * 100),
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
    throw new Error('Payment processing failed. Please try again later.');
  }
};

module.exports = { stripeCheckout };
