import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import handleUpload from './api/upload';
import handleAddProduct from './api/products';

function Dashboard() {
const [orders, setOrders] = useState([]);
const [type, setType] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [image, setImage] = useState('');

const handleTypeChange = (e) => {
  setType (e.target.value);
};
const handlePriceChange = (e) => {
  setPrice (e.target.value);
};
const handleDescriptionChange = (e) => {
  setDescription (e.target.value);
};
const handleImageChange = async (e) => {
  try {
  // setImage (e.target.value);
  const image = await handleUpload (e.target.files[0]);
  setImage(image);
  console.log('image uploaded successfully');
  } catch (error) {
    console.error ('error with image upload', error);
  }
};

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

    const formData = new FormData();
    formData.append('type', type);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);


    const response = await fetch ("api/products", {
      method: 'POST',
      body: formData,
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

// Function to handle form submission
const handleFormSubmit = (e) => {
  e.preventDefault();
  // Call your addNewProduct function when the form is submitted
  addNewProduct();
};

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
          <input type="text" value={type} onChange={handleTypeChange} placeholder="Type" />
          <input type="text" value={price} onChange={handlePriceChange} placeholder="Price" />
          <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" />
          <input type="file" value={image}
          onChange={handleImageChange}
          />
          {/* Additional fields if needed */}
          {/* Submit button */}
          <button type="submit">Add Product</button>
        </form>
    </div>
    </ProtectedRoute>
  );
}
export default Dashboard;