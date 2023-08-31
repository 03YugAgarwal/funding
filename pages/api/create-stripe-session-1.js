import stripe from "stripe";
const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SK;
const stripeClient = new stripe(stripeSecretKey);

export default async function handler(req, res) {
  try {
    const redirectURL = `http://localhost:3000/${req.body._id}`;

    const { item } = req.body;
    const transformedItem = {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      description: item.description,
      quantity: item.quantity,
    };

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [transformedItem],
      mode: "payment",
      success_url: `${redirectURL}?status=success`,
      cancel_url: `${redirectURL}?status=cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
