import React 
// { useEffect } 
from 'react';
// import { useShoppingCart } from '../context/shoppingCartContext';
// Import necessary dependencies and the sendConfirmationEmail function
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { sendConfirmationEmail } from '/utils/emailUtil';
const successBackground = "https://res.cloudinary.com/dzghua4dz/image/upload/v1705325724/moonrubyshop/nygvgkwzp5zvfijgvmbo.jpg"

function Success() {
  // const {cartItems, setCartItems} = useShoppingCart();
  // const router = useRouter();
  // useEffect is used to perform an action (emptying the cart)
  // useEffect(() => {
  //   const handleEmptyingShoppingCart = () => {
  //     // Empty the shopping cart
  //     setCartItems([]);
  //   };

  //   // Call the function when the component mounts
  //   handleEmptyingShoppingCart();
  // }, [setCartItems]); // Ensure to include setCartItems in the dependency array

  //   // Trigger sendConfirmationEmail on component mount
  // useEffect(() => {
  //   const orderDetails = router.query.orderId;;
  //   const toEmail = router.query.totalSum;
  //   // Check if the values are available
  //   if (orderDetails && toEmail) {
  //   //   // Now you can use orderId and totalSum as needed
  //     console.log('orderDetails:', orderDetails);
  //     console.log('toEmail:', toEmail);
  //   // sendConfirmationEmail(toEmail, orderDetails);
  //   // Make API request to send email
  //   fetch('/api/sendEmail', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ toEmail, orderDetails }),
  //   });
  // }
  // }, []); // Empty dependency array ensures the effect runs only once after mount

  return (
    <div className='success-container'>
      <div className="success-background-container">
        <img src={successBackground} alt="Etsy" className="success-image" />
      </div>
        <h2 className="moon-ruby-shop">Thanks and hugs from Moon Ruby Shop</h2>
        <h2>You did it</h2>
        <h2>successfull success!</h2>
        <h4>check your e-mail with order details</h4>
        </div>
  );
}

export default Success