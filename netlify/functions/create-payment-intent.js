require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const {amount} = JSON.parse(event.body);

    const paymentIntend = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ["card"]
    });

    return {
      statusCode: 200,
      body: JSON.stringify({paymentIntend})
    };
  } catch (e) {
    console.log({e});
    return {
      statusCode: 400,
      body: JSON.stringify({e})
    };
  }
}
