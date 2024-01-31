// Import necessary Firebase modules
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default async function handleAddProduct(req, res) {
  if (req.method === "POST") {
    try {
      // Extract product data from the request body
      const { type, price, description, image } = req.body;

      // Validate that required fields are present
      if (!type || !price || !description || !image) {
        return res
          .status(400)
          .json({ error: "Type, price, description and image are required fields." });
      }

      // Add the product to Firestore
      const docRef = await addDoc(collection(db, "products"), {
        type,
        price,
        description,
        image,
        // Add other fields as needed
      });

      // Respond with the ID of the added product
      res.status(201).json({ productId: docRef.id });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}