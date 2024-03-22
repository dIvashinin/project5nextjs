// // Install nodemailer using npm
// // npm install nodemailer

// // i moved all of it to backend...

// import nodemailer from 'nodemailer';

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.NODEMAILER_EMAIL,
//     pass: process.env.NODEMAILER_PASS,
//   },
// });

// // Function to send a confirmation email
// const sendConfirmationEmail = (toEmail, orderDetails) => {
//   const mailOptions = {
//     from: process.env.NODEMAILER_EMAIL,
//     to: toEmail,
//     subject: 'Your order confirmation',
//     html: `<p>Thanks for your purchase! Here are your order details:</p>
           
//            <p>Total Sum: ${totalSum}</p>`,
//   };

//   // <p>Order ID: ${orderDetails.orderId}</p>

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// // Usage in success page
