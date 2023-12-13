import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

function Checkout({handleCheckout}) {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");

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
}

    // Close the cart after checkout
    // handleCheckout();

    useEffect(() => {
      console.log("Checkout component rendered!");
    }, []);

    return (
      <div>
        <h3>Please enter your delivery details</h3>
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
          <button type="submit">continue to payment</button>
        </form>
      </div>
    );
  };

export default Checkout;
