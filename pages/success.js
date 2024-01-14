import React from 'react';
// Import necessary dependencies and the sendConfirmationEmail function
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { sendConfirmationEmail } from '/utils/emailUtil';

function success() {
  const router = useRouter();

    // Trigger sendConfirmationEmail on component mount
  useEffect(() => {
    const orderDetails = router.query.orderId;;
    const toEmail = router.query.totalSum;
    // Check if the values are available
    if (orderId && totalSum) {
    //   // Now you can use orderId and totalSum as needed
      console.log('Order ID:', orderId);
      console.log('Total Sum:', totalSum);
    // sendConfirmationEmail(toEmail, orderDetails);
    // Make API request to send email
    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toEmail, orderDetails }),
    });
  }
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