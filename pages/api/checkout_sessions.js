import { db } from "../../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
// import { useCheckout } from "../../context/checkoutContext";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // console.log('req :>> ', req);
      const items = req.body.cartItem;
      // const orderId = orderDocRef.id;
      // const {checkoutDetails, setDetails} = useCheckout();
      // const deliveryDetails = req.body.deliveryDetails;
      // const totalSum = req.body.totalSum;
      // console.log("items checkout session :>> ", items);
      // console.log('checkoutDetails :>> ', checkoutDetails);
      // console.log('deliveryDetails :>> ', deliveryDetails);
      // console.log('totalSum :>> ', totalSum);
      // Check if items is defined and is an array
      if (!Array.isArray(items)) {
        return res
          .status(400)
          .json({ error: "Invalid request. Items must be an array." });
      }

      const transformedItems = items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.type,
            description: `${item.color} ${item.size}`,
            images: [item.image],
          },

          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      }));

      // Create an order document in Firestore
      const orderDocRef = await addDoc(collection(db, "paid orders"), {
        items: req.body.cartItem,

      //   checkoutDetails: checkoutDetails,
      //  totalSum:checkoutDetails.totalSum,
        // body: req.body,
        timestamp: serverTimestamp(),
        // Add more details as needed
      });

      // try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: transformedItems,
        mode: "payment",
        //i included the id of freshly made order, though it's not necessary in my case
        // success_url: `${req.headers.origin}/success?orderId=${orderDocRef.id}`,
        success_url: `${req.headers.origin}/success`,
        // actually this cancel is when user clicks back during payment session!
        // with the additional query parameter cancel=true.
        // This way, i can use the presence of this query parameter on /shop page
        // to conditionally display an alert indicating payment was canceled.
        cancel_url: `${req.headers.origin}/shop?cancel=true`,
        // metadata: {
        //   deliveryDetails,
        //   totalSum,
        // },
      });
      //   res.redirect(303, session.url);
      res.status(200).json({ sessionURL: session.url });
    } catch (err) {
      console.error("Error creating Checkout session:", err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// api/checkout_sessions.js
// to test - hardcoded values
// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       try {
//         // Hardcoded values for testing
//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ['card'],
//           line_items: [{
//             price_data: {
//               currency: 'usd',
//               product_data: {
//                 name: 'T-shirt',
//               },
//               unit_amount: 2000, // $20.00
//             },
//             quantity: 1,
//           }],
//           mode: 'payment',
//           success_url: `${req.headers.origin}/success`,
//           cancel_url: 'https://example.com/cancel',
//         });

//         res.status(200).json({ sessionURL: session.url });
//       } catch (error) {
//         console.error('Error creating Checkout session:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     } else {
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end('Method Not Allowed');
//     }
//   }
