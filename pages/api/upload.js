import { v2 as cloudinary } from "cloudinary";
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file
  }
});
// Initialize Multer with storage options
const upload = multer({ storage: storage });

export default async function handleUpload(req, res) {
  if (req.method === "POST") {
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: "moonrubyshop", // specify a folder in Cloudinary
    });

    res.status(200).json(result);
    console.log("upload success");
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
