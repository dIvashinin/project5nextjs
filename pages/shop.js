import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ProductCard from "../components/ProductCard";
// import ProductCard from "../components/ProductCard";

export const getStaticProps = async () => {
  try {

    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = [];
    productsSnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().description}`);
        products.push({
            id: doc.id,
            type: doc.data().type,
            price: doc.data().price,
            description: doc.data().description,
            image: doc.data().image,
        });
        console.log('products :>> ', products);
    });

    const reviewsSnapshot = await getDocs(collection(db, "reviews"));
    const reviews = [];
    reviewsSnapshot.forEach((doc) => {
        //we can see our data in console!
        console.log(`${doc.id} => ${doc.data().review}`);
        // Push each review into the array
        reviews.push({
            id: doc.id,
            review: doc.data().review,
            name: doc.data().name,
            // date: doc.data().date,
            //here we add other properties
        })
    });

    return {
      props: { products, reviews },
      //will change this later, now it's 60 sec
      // revalidate: 60
    };
} catch (error) {
    console.error("error fetching products:", error.message);
    return {
            props: {products:[], reviews: []},
        //     // revalidate: 60,
        };
    }
};


function Shop({products, reviews }) {
  return (
    <div>
      <h2>shop</h2>
        {/* here we display products */}
        <div className="products-shop">
            {products.map((product) => (
                <div key = {product.id} className="stuff-inside-products-div">
                    <ProductCard product={product} />
                    {/* <img className="product-image" src={product.image}></img>
                    <p>{product.type}</p>
                    <p>{product.price}</p>
                    <p>{product.description}</p> */}
                    
                </div>
            ))}
        </div>

    <div className="reviews-shop">
        {/* here go reviews */}
        <h4>what other people say about this shop</h4>
      {/* Map over the reviews and render each one */}
      {reviews.map((review) => (
        <div key={review.id}>
            <p>{review.review}</p>
            <p>{review.name}</p>
        {/* // {product.description} */}
        {/* // {review.name} */}
        {/* // <ProductCard key={review.description} review={review} /> */}
    {/* //   ))} */}
         </div>
    ))}
    </div>
     </div> 
  );
}
export default Shop;
