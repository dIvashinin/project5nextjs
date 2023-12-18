import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../config/firebaseConfig";

const OrderSummaryComponent = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from Firestore
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
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
