import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useShoppingCart } from "../context/ShoppingCartContext";
// import { useRouter } from 'next/router';
import { useCheckout } from "../context/checkoutContext";

const OrderSummaryComponent = ({ orderId, totalSum }) => {
  const [orderData, setOrderData] = useState(null);
  const {createCheckoutSession} = useShoppingCart();
  const {checkoutDetails, setDetails} = useCheckout();
  // const router = useRouter();
  const [continueToPaymentLoading, setContinueToPaymentLoading] = useState(false);

  useEffect(() => {
    // Fetch 1 order from Firestore
    const fetchOrderData = async () => {
      try {
        if (!orderId) {
          console.error("Order ID is undefined");
          return;
        }
        const orderDoc = await getDoc(doc(db, "orders", orderId));
        console.log('orderDoc :>> ', orderDoc); 
        if (orderDoc.exists()) {
          setOrderData(orderDoc.data());
        } else {
          console.error("Order not found");
        }
      } catch (error) {
        console.error("Error fetching order data: ", error);
      }
    };

    fetchOrderData();
  }, [orderId]);
  // console.log('orderData :>> ', orderData.email);

  const handleContinueToPayment = async () => {
    setContinueToPaymentLoading (true);
    try {
      // Create the Stripe Checkout session
      await createCheckoutSession(
      //   {
      //   deliveryDetails: checkoutDetails.deliveryDetails,
      //   totalSum: checkoutDetails.totalSum,
      // }
      );
      // Redirect to the /success page with order details as query parameters
      // router.push(`/success?orderId=${orderId}&totalSum=${totalSum}`);

      // You might also want to close the order summary component or do other UI changes
    } catch (error) {
      console.error("Error creating Stripe Checkout session: ", error);
    } finally {
      setContinueToPaymentLoading(false);
    }
  };

  if (!orderData) {
    return null; // Or a loading indicator
  }

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <h5>please check, update if you need and proceed to payment</h5>
      <p>Email: {orderData.email}</p>
      <p>Name: {orderData.name}</p>
      <p>Country: {orderData.country}</p>
      <p>City: {orderData.city}</p>
      <p>Postcode: {orderData.postcode}</p>
      <p>Street: {orderData.street}</p>
      <p>Comment: {orderData.comment}</p>
      <hr />
      <h3>Ordered Items</h3>
      {orderData.cartItems.map((item) => (
        // <div key={item.id}>
        <div key={`${item.id}-${item.color}-${item.size}`}>
          <p>Product: {item.type}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Size: {item.size}</p>
          <p>Price: {item.price}</p>
          <p>Description: {item.description}</p>
        </div>
      ))}
      <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
        Total sum: {totalSum}&euro;
      </div>
      {/* <button className="continue-to-payment-button" type="submit" onClick={handleContinueToPayment}>
        continue to payment
      </button> */}

      <button 
                className="btn btn-primary" 
                type="button" disabled={continueToPaymentLoading} // Disable the button when deleteLoading is true
                onClick={handleContinueToPayment}
                >
                  {continueToPaymentLoading && ( // Conditionally render the spinner if continueToPaymentLoading is true
                  <>
                   <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                   <span className="visually-hidden" role="status">Loading...</span>
                  </>
                  )}
                  {!continueToPaymentLoading && "continue to payment"} {/*Render the button text if continueToPaymentLoading is false */}
                  </button>



      {/* {orderPlaced && (
        <OrderSummaryComponent handleCheckoutClose={handleCheckoutClose} />
      )} */}

      {/* <button className="checkout-close-button" onClick={handleCheckoutClose}>
        X
      </button> */}
    </div>
  );
};

export default OrderSummaryComponent;
