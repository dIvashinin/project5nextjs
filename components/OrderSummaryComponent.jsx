import React, { useEffect, useState } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebaseConfig";

const OrderSummaryComponent = ({orderId}) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Fetch 1 order from Firestore
    const fetchOrderData = async () => {
      try {
        if (!orderId) {
          console.error('Order ID is undefined');
          return;
        }
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrderData(orderDoc.data());
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order data: ', error);
      }
    };

    fetchOrderData();
  }, [orderId]); 
  console.log('orderData :>> ', orderData.email);

  if (!orderData) {
    return null; // Or a loading indicator
  }
  
  return (
    <div className='order-summary-cantainer'>
      <h2>Order Summary</h2>
      <p>Email: {orderData.email}</p>
      <p>Name: {orderData.name}</p>
      <p>Country: {orderData.country}</p>
      {/* Add more details as needed */}
      
      <h3>Ordered Items</h3>
      {orderData.cartItems.map((item) => (
        <div key={item.id}>
          <p>Product: {item.name}</p>
          <p>Quantity: {item.quantity}</p>
          {/* Add more details about each item */}
        </div>
      ))}
    </div>
  );
};

export default OrderSummaryComponent;
