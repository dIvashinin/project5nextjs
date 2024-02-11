import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// here cloudinary config
// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Define storage options
const storage = multer.diskStorage({
  // The destination function specifies the directory where uploaded files will be saved
  destination: function (req, file, cb) {
    // cb is a callback function provided by Multer. It is used
    // to indicate when the operation (in this case, saving the file) is complete.
    cb(null, "uploads/"); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for the uploaded file
  },
});
// Initialize Multer with storage options
const upload = multer({ storage: storage }); //Initializes Multer with the specified storage options.

// Define your API route handler
export default function handler(req, res) {
  if (req.method === "POST") {
    // Use the upload middleware to handle file upload
    // specifies that only one file with the field name 'file' will be uploaded.
    upload.single("file")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error("Multer error:", err);
        res.status(500).json({ error: "File upload failed" });
      } else if (err) {
        // An unknown error occurred
        console.error("Unknown error:", err);
        res.status(500).json({ error: "An unknown error occurred" });
      } else {
        // File upload was successful
        res.status(200).json({ message: "File uploaded successfully" });
      }
    });
  } else {
    // Method not allowed
    res.status(405).json({ error: "Method not allowed" });
  }
}

// export default async function handleUpload(req, res) {
//   if (req.method === "POST") {
//     const result = await cloudinary.uploader.upload(req.body.image, {
//       folder: "moonrubyshop", // specify a folder in Cloudinary
//     });

//     res.status(200).json(result);
//     console.log("upload success");
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
