import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
// import ProductCard from "../components/ProductCard";

export const getStaticProps = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "reviews"));
    const reviews = querySnapshot.forEach((doc) => {
        //we can see our data in console!
        console.log(`${doc.id} => ${doc.data().review}`);
        // id: doc.id,
        // ...doc.data(),
    });
    console.log('reviews :>> ', reviews);

    return {
      props: { reviews },
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

function Shop({  }) {
  return (
    <div>
      <h2>shop</h2>
      {/* {reviews.map((review) => ( */}
        {/* // {product.description} */}
        {/* // {review.name} */}
        {/* // <ProductCard key={review.description} review={review} /> */}
    {/* //   ))} */}
    </div>
  );
}

export default Shop;
