import React, { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import Alert from "react-bootstrap/Alert";
// import handleUpload from './api/upload';
// import handleAddProduct from './api/products';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  //this one is file itself
  const [imageFile, setImageFile] = useState([]);
  //this one is URL of the file
  const [image, setImage] = useState("");
  const [showAlert1, setShowAlert1] = useState(false); // State to manage the alert
  const [showAlert2, setShowAlert2] = useState(false); // State to manage the alert

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
    // setImageFile(e.target.files[0]);

    //let's try to to capture multiple selected files
    const selectedFiles = Array.from(e.target.files); // Convert FileList to array
    // setImageFile(selectedFiles);  // Store selected files in state
    setImageFile((prevFiles) => [...prevFiles, ...selectedFiles]); //Concatenate with existing files
    // console.log('e.target.files[0] :>> ', e.target.files[0]);
  };

  // i had 2 separate submits which caused issues
  // now everything is in one function!
  // useEffect(() => {
  //   // Wrap the code inside useEffect to ensure it runs only on the client side
  //   //taken from https://cloudinary.com/documentation/client_side_uploading
  //   const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  // const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;
  // const form = document.querySelector("form");

  //   form.addEventListener("submit", (e) => {
  //     e.preventDefault();
  //     const files = document.querySelector("[type=file]").files;
  //     const formData = new FormData();

  //     for (let i = 0; i < files.length; i++) {
  //       let file = files[i];
  //       formData.append("file", file);
  //       formData.append("upload_preset", "my-moonrubyshop-2");
  // // console.log('file :>> ', file);
  //       fetch(url, {
  //         method: "POST",
  //         body: formData
  //       })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((data) => {
  //         // document.getElementById("data").innerHTML += data;
  //         setImage(data.secure_url);
  //         // console.log('data.secure_url :>> ', data.secure_url);
  //           // console.log('document :>> ', document);
  //         });
  //     }
  //   });
  // }, []); // Empty dependency array ensures this runs only once on component mount

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
      const ordersCollectionRef = collection(db, "paid orders");
      const ordersSnapshot = await getDocs(ordersCollectionRef);
      const ordersData = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
      console.log("ordersData :>> ", ordersData);
    };
    fetchOrders();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;
  const formData = new FormData();

  imageFile.forEach((file) => {
    formData.append("file", file);
    formData.append("upload_preset", "my-moonrubyshop-2");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data); // Log the response data
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  });
};



    // Call addNewProduct function when the form is submitted
    // addNewProduct();

    // Check if any of the required fields are empty
    // commented out as it's causing issues and we can work without it!
    // if (!type || !price || !description || !image) {
    //   setShowAlert1(true);
    //   console.log('Please fill in all required fields.');
    //   return; // Exit early if any required field is empty
    // }
    // in order to have only one correct submit i put upload to cloudinary function
    // inside handleFormSubmit function. As it was causing issues.
    // try {
      // Upload image to Cloudinary
      // const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      // We create a FormData object to store multiple files.
      // const formData = new FormData(); //same for single
      // formData.append("file", imageFile);//this was for single

      // here modification for multiple upload
      // Append each selected file to the FormData object using a loop
      // console.log('imageFile :>> ', imageFile);
      // for (const file of imageFile) {
        // imageFile.forEach((file, index) => {
          // formData.append(`file${index}`, file);
      // imageFile.forEach((file) => {
        // formData.append('file', file); // Append each file with a unique key
        // formData.append("upload_preset", "my-moonrubyshop-2");
        // console.log('file :>> ', file);
      // }
      // )
      // ;
      // console.log("imageFile :>> ", imageFile);
      // console.log('formData :>> ', formData);

      // const response = await fetch(
        // let's try 'auto' instead of 'image': this will utomatically check what is being uploaded
        // `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
        // {
          // method: "POST",
          // body: formData,
        // }
      // );
      // if (!response.ok) {
        // throw new Error("Failed to upload image (-s) to Cloudinary");
      // }
      // const imageData = await response.json();
      // setImage(imageData.secure_url);
      // console.log("formData :>> ", formData);
      // console.log("imageData :>> ", imageData);

      // Extract URLs of uploaded images
      // const imageUrls = Object.keys(imageData).map(
      //   (key) => imageData[key].secure_url
      // );

      // Submit form data to backend
      // const productResponse = await fetch("/api/products", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     type,
      //     price,
      //     description,
      //     // image: imageData.secure_url, // Use the image URL from Cloudinary
      //     image: imageUrls, // Use the URLs of uploaded images
      //   }),
      // });

      // if (!productResponse.ok) {
      //   throw new Error("Failed to add new product");
      // }

      // // Reset form fields
      // // setType("");
      // // setPrice("");
      // // setDescription("");
      // // setImage("");

      // Optionally, update UI or take other actions
    //   console.log("New product added successfully");
    //   setShowAlert2(true);
    // // } catch (error) {
    //   console.error("Error adding new product:", error);
    //   setShowAlert2(false);
    // }
  // };

  //     //sending data to /products endpoint in backend
  //     const response = await fetch ("/api/products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         type,
  //         price,
  //         description,
  //         image,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to add new product');
  //     }

  //   // If successful, you might want to handle the response
  //   const result = await response.json();
  //   console.log('New product added:', result.productId);
  //   setShowAlert2(true);

  //   // Optionally, you can update your UI or take other actions
  // } catch (error) {
  //   console.error('Error adding new product:', error);
  //   // Handle error gracefully
  //   setShowAlert2(false);
  // }
  // };

  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <div className="dashboard-order-container">
          <h1>Good to see you!</h1>
          <ul className="order-list">
            {/* displaying paid orders */}
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <div className="dashboard-inner-separate-order-container">
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
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Form for adding a new product */}

        <h3>Add new listing</h3>
        <div className="dashboard-add-new-container">
          {/* <Alert 
      // the alert content changes dynamically based on the condition
      variant=
        'warning'  
show={showAlert1}
      onClose={() => setShowAlert1(false)}
      dismissible
      >
        Please fill in all the fields correctly!
      </Alert> */}
          <Alert
            // the alert content changes dynamically based on the condition
            variant="success" // {showAlert2 ?
            // : 'warning'} // variant based on condition
            show={showAlert2}
            onClose={() => setShowAlert2(false)}
            dismissible
          >
            {/* {showAlert ?  'Please fill in all the fields correctly!' : 'Congrats! Product added successfully!'} */}
            Congrats! Product added successfully!
          </Alert>
          <form className="product-form" onSubmit={handleFormSubmit}>
            {/* form inputs */}
            {/* <input
              type="text"
              value={type}
              onChange={handleTypeChange}
              placeholder="Type"
            /> */}
            <div className="form-group">
              <label htmlFor="type">Type: </label>
              <select
                id="type"
                onChange={handleTypeChange}
                // value={type}
              >
                {/* disabled value doesn't count as value! */}
                {/* <option disabled value="pls select color">pls select color</option> */}
                {/* i decided to hardcode the types and its values to easily choose from the list */}
                <option value="ring">ring</option>
                <option value="earring">earring</option>
                <option value="bracelet">bracelet</option>
                <option value="necklace">necklace</option>
                <option value="option 5">option 5</option>
                <option value="option 6">option 6</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                id="price"
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="Price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                multiple // Allow multiple file selection
              />
            </div>

            <div id="data"></div>
            {/* Additional fields if needed */}
            {/* Submit button */}
            <button type="submit">Add Product</button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
export default Dashboard;