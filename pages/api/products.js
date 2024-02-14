// This is a common flow for creating resources (in this case, a new product)
// in a web application. The frontend collects and sends data, and the backend
// validates, processes, and stores that data.
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default async function handleAddProduct(req, res) {
  if (req.method === "POST") {
    try {
      // Extract product data from the request body
      const { type, price, description, image } = req.body;
      console.log('type :>> ', type);

      // Validate that required fields are present
      if (!type || !price || !description || !image) {
        console.log('u need to fill in all :>> ');
        // return res
        //   .status(400)
        //   .json({
        //     error: "Type, price, description and imageUrl are required fields.",
        //   });
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
