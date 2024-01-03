import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
// import { Offcanvas, Stack } from "react-bootstrap";
// import { useShoppingCart } from "../context/shoppingCartContext";
import Alert from "react-bootstrap/Alert";
import { useShoppingCart } from "../context/shoppingCartContext";
import OrderSummaryComponent from "./OrderSummaryComponent";

// import { useRouter } from "next/router";

const Checkout = ({ handleCheckoutClose, isOpen, totalSum }) => {
  const { cartItems } = useShoppingCart();
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to manage the alert
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null); // to store the ID of the created order
  //   const {
  //     closeCart,
  //     cartItems,
  //     removeFromCart,
  //     increaseCartQuantity,
  //     decreaseCartQuantity,
  //   } = useShoppingCart();

  // const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log('email :>> ', email);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };
  const handleApartmentChange = (e) => {
    setApartment(e.target.value);
  };
  const handlePostCodeChange = (e) => {
    setPostcode(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    //never forgetting to prevent this refresh default behaviour!
    e.preventDefault();

    // Validation checks
    if (!email || !isValidEmail(email)) {
      // alert ("your email is not correct");
      setShowAlert(true); // Show the alert
      console.log("Invalid email");
      return;
    }
    if (!country) {
      setShowAlert(true); // Show the alert
      // alert ("pls add country");
      console.log("pls add country");
      return;
    }
    if (!name) {
      setShowAlert(true);
      console.log("pls add name");
      return;
    }
    if (!street) {
      setShowAlert(true);
      console.log("pls add street");
      return;
    }
    if (!postcode) {
      setShowAlert(true);
      console.log("pls add postcode");
      return;
    }
    if (!city) {
      setShowAlert(true);
      console.log("pls add city");
      return;
    }
    console.log("cartItems in checkout :>> ", cartItems);
    console.log(
      "delivery details :>> ",
      email,
      country,
      name,
      street,
      apartment,
      postcode,
      city
    );
    // An option to save the data to local storage
    // better not to use it
    //   const orderData = {
    //     email,
    //     country,
    //     name,
    //     street,
    //     apartment,
    //     postcode,
    //     city,
    //     cartItems,
    //   };

    //   localStorage.setItem("orderData", JSON.stringify(orderData));

    //   console.log('orderData :>> ', orderData);
    // we better save data to firebase
    try {
      // Save the order data to Firestore
      // in this case we create a collection 'orders' in db with all these fields
      // using addDoc from Firebase
      const docRef = await addDoc(collection(db, "orders"), {
        email,
        country,
        name,
        street,
        apartment,
        postcode,
        city,
        cartItems,
      });
      console.log("Document written with ID: ", docRef.id);

      // Set the state to indicate that the order has been placed
      setOrderPlaced(true);
      setOrderId(docRef.id); // Store the ID of the created order
      // Continue with payment process or redirect to another page
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Helper function to check if the email is in a valid format
  const isValidEmail = (email) => {
    // You can use a regular expression for a basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Close the cart after checkout
  // handleCheckout();

  useEffect(() => {
    console.log("Checkout component rendered!");
  }, []);

  return (
    <div className="checkout-form-container">
      {/* {orderPlaced && <OrderSummaryComponent orderId={orderId} />} */}
      {/* <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> */}
      <h3>Please enter your delivery details</h3>
      {/* </Offcanvas.Title>
      </Offcanvas.Header> */}
      {/* in order to have our added to cart items visible */}
      {/* <Offcanvas.Body>
        <Stack gap={1}> */}
      <Alert
        variant="warning"
        show={showAlert}
        onClose={() => setShowAlert(false)}
        dismissible
      >
        pls fill in all the fields correctly!
      </Alert>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="email"
          placeholder="email"
          onChange={handleEmailChange}
        />
        <label htmlFor="email">email</label>
        <input
          type="text"
          id="country"
          placeholder="country"
          onChange={handleCountryChange}
        />
        <label htmlFor="country">country</label>
        <input
          type="text"
          id="name"
          placeholder="full name"
          onChange={handleNameChange}
        />
        <label htmlFor="name">full name</label>
        <input
          type="text"
          id="street"
          placeholder="street address"
          onChange={handleStreetChange}
        />
        <label htmlFor="street">street address</label>
        <input
          type="text"
          id="apartment"
          placeholder="apartment (optional)"
          onChange={handleApartmentChange}
        />
        <label htmlFor="apartment">apartment</label>
        <input
          type="text"
          id="postcode"
          placeholder="post code"
          onChange={handlePostCodeChange}
        />
        <label htmlFor="postcode">post code</label>
        <input
          type="text"
          id="city"
          placeholder="city"
          onChange={handleCityChange}
        />
        <label htmlFor="city">city</label>
        <button
          className="submit-delivery-details-button"
          type="submit"
          onClick={handleSubmit}
        >
          submit delivery details
        </button>
      </form>
      {orderPlaced && <OrderSummaryComponent orderId={orderId} 
      // totalSum={totalSum} 
      />}
      {/* {orderPlaced && (
        <OrderSummaryComponent handleCheckoutClose={handleCheckoutClose} />
      )} */}

      {/* <button className="checkout-close-button" onClick={handleCheckoutClose}>
        X
      </button> */}
      {/* </Stack>
          </Offcanvas.Body> */}
    </div>
    //   </Offcanvas>
  );
};

export default Checkout;
