// This will be the endpoint where Stripe will send events.
import { buffer } from 'micro';
// buffer is a function from the micro library. It's used to buffer the incoming request body.
import { verifySignature } from '../../util/stripe';
// verifySignature is a custom function or method from a stripe utility file (likely /util/stripe.js or similar). 
// It's used to verify the signature of the incoming webhook event.
// The verifySignature function is typically used to verify the integrity and authenticity of the incoming webhook event. 
// It ensures that the event was indeed sent by Stripe and not tampered with.

export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Buffer the request body
    const buf = await buffer(req);
    // Get the Stripe webhook secret from the environment variables
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    // stripe.webhooks.constructEvent is a Stripe SDK function that constructs the 
    // webhook event from the request payload, the signature, and the webhook secret.
    try {
      // Verify the signature of the incoming webhook event
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        req.headers['stripe-signature'],
        secret
      );
    } catch (err) {
      // Handle verification errors
      console.error('Webhook Error:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
// The code then switches on the type of the event. For example, if it's 
// a checkout.session.completed event, it means a payment was successful. 
// You can handle this event by updating the order status, marking it as paid, etc.
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Handle successful payment, update order status, etc.
        console.log('Payment was successful:', session);
        break;
      // Add more cases for other events you want to handle

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Respond with a success status
    res.status(200).json({ received: true });
  } else {
    // Respond with a 405 Method Not Allowed if the request method is not POST
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
