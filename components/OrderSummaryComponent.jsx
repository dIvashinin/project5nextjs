import React, { useEffect, useState } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebaseConfig";

const OrderSummaryComponent = (orderId) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Fetch 1 order from Firestore
    const fetchOrderData = async () => {
      try {
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

  if (!orderData) {
    return null; // Or a loading indicator
  }

  return (
    <div className='order-summary-cantainer'>
      <h2>Order Summary</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Email: {order.email}</p>
            <p>Name: {order.name}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderSummaryComponent;
