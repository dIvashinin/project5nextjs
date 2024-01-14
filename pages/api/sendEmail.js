import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
      }

      const { toEmail, orderDetails } = req.body;

  try {
    // Your email sending logic here
  // Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  
  // Function to send a confirmation email
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: toEmail,
      subject: 'Your order confirmation',
      html: `<p>Thanks for your purchase! Here are your order details:</p>
             
      <p>Order ID: ${orderDetails.orderId}</p>
             <p>Total Sum: ${totalSum}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });

} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
