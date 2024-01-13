import React from 'react';
// Import necessary dependencies and the sendConfirmationEmail function
import { useEffect } from 'react';
import { sendConfirmationEmail } from '/utils/emailUtil';

function success(docRef) {

    // Trigger sendConfirmationEmail on component mount
  useEffect(() => {
    const orderDetails = docRef.id;
    const toEmail = docRef.id;
    sendConfirmationEmail(toEmail, orderDetails);
  }, []); // Empty dependency array ensures the effect runs only once after mount

  return (
    <div className='success-container'>
        <h2 className="moon-ruby-shop">Thanks and hugs from Moon Ruby Shop</h2>
        <h2>You did it</h2>
        <h2>successfull success!</h2>
        <h4>check your e-mail with order details</h4>
        </div>
  )
}

export default success