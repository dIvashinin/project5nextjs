//this is for this: fetch(`/api/${product.id}`
//id of each product listing
import { doc, updateDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default async function handler(req, res) {
  const { productId } = req.query;

  if (req.method === "PUT") {
    try {
      const {
        type,
        price,
        description,
        // i exclude image because i do add image separately
        // , image
      } = req.body;
      console.log("type :>> ", type);

      // Create a reference to the specific document using doc() function
      const productDocRef = doc(db, "products2", productId);

      // Update the document with the specified data using updateDoc() function
      await updateDoc(productDocRef, {
        type,
        price,
        description,
        // image,
        // Add other fields as needed
      });

      res.status(200).json({ message: "Product successfully updated" });
      console.log("success!");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }

    //it's a common practice to have multiple handler fuctions within one file for different types of requests

    // } else if (req.method === 'PATCH') { // Using PATCH method for updating the image
    //   try {
    //       const { imageUrl } = req.body; // Assuming the image URL is sent in the request body

    //       const productDocRef = doc(db, "products2", productId);

    //       await updateDoc(productDocRef, {
    //           image: imageUrl, // Update the image field with the new image URL
    //       });

    //       res.status(200).json({ message: 'Product image successfully updated' });
    //     } catch (error) {
    //       console.error('Error updating product image:', error);
    //       res.status(500).json({ error: 'Failed to update product image' });
    //   }

    //it's a common practice to have multiple handler fuctions within one file for different types of requests
  } else if (req.method === "DELETE") {
    try {
      //creating reference to the specific doc using doc() function
      const productDocRef = doc(db, "products", productId);
      //deleting doc
      await deleteDoc(productDocRef);
      res.status(200).json({ message: "Product deleted" });
      console.log("deleted!!!!");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" }); // Respond with Method Not Allowed error for other HTTP methods
  }
}
