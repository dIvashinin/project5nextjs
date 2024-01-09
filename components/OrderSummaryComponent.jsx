import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const OrderSummaryComponent = ({ orderId, handleCheckout, totalSum }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Fetch 1 order from Firestore
    const fetchOrderData = async () => {
      try {
        if (!orderId) {
          console.error("Order ID is undefined");
          return;
        }
        const orderDoc = await getDoc(doc(db, "orders", orderId));
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
      <button className="continue-to-payment-button" type="submit">
        continue to payment
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
