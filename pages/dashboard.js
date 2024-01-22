import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// function Dashboard() {
  const Dashboard = () => {
const [orders, setOrders] = useState([]);

useEffect(() => {
  const fetchOrders = async () => {
    const querySnapshot = await getDocs(query(collection(db, 'orders'), where('paid', '==', true)));
    const paidOrders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrders(paidOrders);
  };

  fetchOrders();
}, []); // Empty dependency array means this effect runs once when the component mounts



// useEffect(() => {
//   // fetching all orders from firestore
//   const fetchOrders = async () => {
//     const ordersCollectionRef = collection(db, 'orders');
//     const ordersSnapshot = await getDocs(ordersCollectionRef);
//     const ordersData = ordersSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ... doc.data(),
//     }));
//     setOrders(ordersData);
//     console.log('ordersData :>> ', ordersData);
//   };
//   fetchOrders();
// }, [])


  return (
    <ProtectedRoute>
    <div>
        <h1>Good to see you!</h1>
        <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>{order} </p>
            {/* Display other order details as needed */}
          </li>
        ))}
      </ul>
    </div>
    </ProtectedRoute>
  );
}

export default Dashboard;