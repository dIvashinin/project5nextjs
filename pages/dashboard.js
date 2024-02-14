import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

// import handleUpload from './api/upload';
// import handleAddProduct from './api/products';

function Dashboard() {
const [orders, setOrders] = useState([]);
const [type, setType] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
//this one is file itself
const [imageFile, setImageFile] = useState('');
//this one is URL of the file
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
// const handleImageChange = async (e) => {
//   try {
//   // setImage (e.target.value);
//   const image = await handleUpload (e.target.files[0]);
//   setImage(image);
//   console.log('image uploaded successfully');
//   } catch (error) {
//     console.error ('error with image upload', error);
//   }
// };
// Since i'm using Multer to handle file uploads on the server side, 
//no need to use the handleUpload function in the client-side code. 
//Instead, -directly set the image state with the selected file.
const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
  // console.log('e.target.files[0] :>> ', e.target.files[0]);
};

useEffect(() => {
  // Wrap the code inside useEffect to ensure it runs only on the client side
  //taken from https://cloudinary.com/documentation/client_side_uploading
  const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;
const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "my-moonrubyshop-2");
// console.log('file :>> ', file);
      fetch(url, {
        method: "POST",
        body: formData
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // document.getElementById("data").innerHTML += data;
        setImage(data.secure_url);
        // console.log('data.secure_url :>> ', data.secure_url);
          // console.log('document :>> ', document);
        });
    }
  });
}, []); // Empty dependency array ensures this runs only once on component mount

//taken from https://cloudinary.com/documentation/client_side_uploading
// const url = "https://api.cloudinary.com/v1_1/dzghua4dz/image/upload";
// const form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = document.querySelector("[type=file]").files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "my-moonrubyshop-2");

//     fetch(url, {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         document.getElementById("data").innerHTML += data;
//       });
//   }
// });

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

// const addNewProduct = async () => {
//   try {
//     const formData = new FormData();
//     formData.append('type', type);
//     formData.append('price', price);
//     formData.append('description', description);
//     formData.append('image', image);

//     const response = await fetch ("api/products", {
//       method: 'POST',
//       body: formData,
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add new product');
//     }
//     // If successful, you might want to handle the response
//     const result = await response.json();
//     console.log('New product added:', result.productId);

//     // Optionally, you can update your UI or take other actions

//   } catch (error) {
//     console.error('Error adding new product:', error);
//     throw error;
//   }
// };

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
const handleFormSubmit = async (e) => {
  e.preventDefault();
  // Call your addNewProduct function when the form is submitted
  // addNewProduct();
  try {
    //sending data to /products endpoint in backend
    const response = await fetch ("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        price,
        description,
        image,
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
  // Handle error gracefully
}
};

  return (
    // <ProtectedRoute>
    <div className="dashboard-container">
        <h1>Good to see you!</h1>
        <ul className="order-list">
          {/* displaying paid orders */}
        {orders.map((order) => (
          <li key={order.id} className="order-item">
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
      <h3>Add new listing</h3>
      <form className="product-form" onSubmit={handleFormSubmit}>
          {/* form inputs */}
          <input type="text" value={type} onChange={handleTypeChange} placeholder="Type" />
          <input type="text" value={price} onChange={handlePriceChange} placeholder="Price" />
          <textarea value={description} onChange={handleDescriptionChange} placeholder="Description" />
          <input type="file" 
          onChange={handleImageChange}
          />
          <div id="data"></div>
          {/* Additional fields if needed */}
          {/* Submit button */}
          <button type="submit">Add Product</button>
        </form>
    </div>
    // </ProtectedRoute>
  );
}
export default Dashboard;