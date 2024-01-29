import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "",
    country: "",
    name: "",
    street: "",
    apartment: "",
    postcode: "",
    city: "",
    comment: "",
    cartItems: "",
    totalSum: "",
  });

  const setDetails = (details) => {
    setCheckoutDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <CheckoutContext.Provider value={{ checkoutDetails, setDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  return useContext(CheckoutContext);
};
