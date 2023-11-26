import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ProductCard from "../components/ProductCard";

export const getStaticProps = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.forEach((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: { products },
      //will change this later, now it's 60 sec
      // revalidate: 60
    };
  } catch (error) {
    console.error("error fetching products:", error.message);
    // return {
    //     props: {products: []},
    //     // revalidate: 60,
    // };
  }
};

function Shop({ product }) {
  return (
    <div>
      <h2>shop</h2>
      {products.map((product) => (
        // {product.description}
        <ProductCard key={product.description} product={product} />
      ))}
    </div>
  );
}

export default Shop;
