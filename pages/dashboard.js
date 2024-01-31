import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

function Dashboard() {
//   const Dashboard = () => {
const [orders, setOrders] = useState([]);
const [type, setType] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [image, setImage] = useState('');

// useEffect(() => {
//   const fetchOrders = async () => {
//     const querySnapshot = await getDocs(query(collection(db, 'paid orders'), where('paid', '==', true)));
//     const paidOrders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setOrders(paidOrders);
//   };

//   fetchOrders();
// }, []); // Empty dependency array means this effect runs once when the component mounts


// This is a common flow for creating resources (in this case, a new product) 
// in a web application. The frontend collects and sends data, and the backend 
// validates, processes, and stores that data.

const addNewProduct = async () => {
  try {
    const response = await fetch ("api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       type: type,
       price: price,
       description: description,
       image: image, 
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add new product');
    }
    // If successful, you might want to handle the response
    const result = await response.json();
    console.log('New product added:', result.productId);

    // Optionally, you can update your UI or take other actions

  } catch (error) {
    console.error('Error adding new product:', error);
    throw error;
  }
};


useEffect(() => {
  // fetching all paid orders from firestore
  const fetchOrders = async () => {
    const ordersCollectionRef = collection(db, 'paid orders');
    const ordersSnapshot = await getDocs(ordersCollectionRef);
    const ordersData = ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ... doc.data(),
    }));
    setOrders(ordersData);
    console.log('ordersData :>> ', ordersData);
    
  };
  fetchOrders();
}, [])


  return (
    <ProtectedRoute>
    <div>
        <h1>Good to see you!</h1>
        <ul>
          {/* displaying paid orders */}
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Timestamp: {order.timestamp.toDate().toString()}</p>
            <p>Email: {order.email}</p>
            <p>Name: {order.name}</p>
            <p>Country: {order.country}</p>
            <p>Postcode: {order.postcode}</p>
            <p>City: {order.city}</p>
            <p>Street: {order.street}</p>
            <p>Apartment: {order.apartment}</p>
            <p>Comment: {order.comment}</p>
            <p>Total: {order.totalSum}&euro;</p>
            {/* <p>Status: {order.paid}</p> */}
          </li>
        ))}
      </ul>
      {/* Form for adding a new product */}
      <form onSubmit={handleFormSubmit}>
          {/* form inputs */}
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" />
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
          {/* Additional fields if needed */}

          {/* Submit button */}
          <button type="submit">Add Product</button>
        </form>
    </div>
    </ProtectedRoute>
  );
}

export default Dashboard;