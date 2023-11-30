// pages/api/stripe.js
import Stripe from "stripe";
const stripe = new Stripe("");

export default async (req, res) => {
  res.status(200).json({ message: "Hello Mom" });
};
