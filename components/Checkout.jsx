import React, { useEffect, useState } from "react";
// import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import Alert from 'react-bootstrap/Alert';

// import { useRouter } from "next/router";

const Checkout = ({handleCheckoutClose, isOpen}) => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");

  const {
    closeCart,
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();

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

  const handleSubmit = (e) => {
    //never forgetting to prevent this refresh default behaviour!
    e.preventDefault();

    // Validation checks
  if (!email || !isValidEmail(email)) {
    alert ("your email is not correct");
    console.log('Invalid email');
    return;
  }
  if (!country) {
    <Alert >add country</Alert>
    // alert ("pls add country");
    console.log('pls add country');
    return;
  }
//   if (!name) {
//     Alert ("pls add name");
//     console.log('pls add name');
//     return;
//   }
//   if (!street) {
//     Alert ("pls add street");
//     console.log('pls add street');
//     return;
//   }
//   if (!apartment) {
//     Alert ("pls add apartment");
//     console.log('pls add apartment');
//     return;
//   }
//   if (!postcode) {
//     Alert ("pls add postcode");
//     console.log('pls add postcode');
//     return;
//   }
//   if (!city) {
//     Alert ("pls add city");
//     console.log('pls add city');
//     return;
//   }


    console.log(
      "email, password etc :>> ",
      email,
      country,
      name,
      street,
      apartment,
      postcode,
      city
    );
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
        {/* <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> */}
        <h3>Please enter your delivery details</h3>
        {/* </Offcanvas.Title>
      </Offcanvas.Header> */}
      {/* in order to have our added to cart items visible */}
      {/* <Offcanvas.Body>
        <Stack gap={1}> */}
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
            placeholder="apartment"
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
          <button className="continue-to-payment-button" type="submit">continue to payment</button>
        </form>
        <button className="checkout-close-button" onClick={handleCheckoutClose}>X</button>
        {/* </Stack>
          </Offcanvas.Body> */}
      </div>
    //   </Offcanvas>
    );
  };

export default Checkout;
