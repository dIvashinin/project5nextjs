// Install nodemailer using npm
// npm install nodemailer

import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Function to send a confirmation email
const sendConfirmationEmail = (toEmail, orderDetails) => {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: 'Order Confirmation',
    html: `<p>Thank you for your purchase! Here are your order details:</p>
           <p>Order ID: ${orderDetails.orderId}</p>
           <p>Total Amount: ${orderDetails.totalAmount}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Usage in success page
