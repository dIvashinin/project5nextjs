import React, { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";

const shopBanner =
  "https://res.cloudinary.com/dzghua4dz/image/upload/v1701986735/moonrubyshop/cgfdekd8afqoxuygrrgb.jpg";

export const getStaticProps = async () => {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = [];
    productsSnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().description}`);
      products.push({
        id: doc.id,
        type: doc.data().type,
        price: doc.data().price,
        description: doc.data().description,
        image: doc.data().image,
      });
      // console.log('products :>> ', products);
    });

    const reviewsSnapshot = await getDocs(collection(db, "reviews"));
    const reviews = [];
    reviewsSnapshot.forEach((doc) => {
      //we can see our data in console!
      // console.log(`${doc.id} => ${doc.data().review}`);
      // Push each review into the array
      reviews.push({
        id: doc.id,
        review: doc.data().review,
        name: doc.data().name,
        // date: doc.data().date,
        //here we add other properties
      });
    });

    return {
      props: { products, reviews },
      //will change this later, now it's 60 sec
      revalidate: 60,
    };
  } catch (error) {
    console.error("error fetching products:", error.message);
    return {
      props: { products: [], reviews: [] },
      //     // revalidate: 60,
    };
  }
};

function Shop({ products, reviews }) {
  // const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
  // const quantity = getItemQuantity(id)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleFilterChange = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
  };
  const router =useRouter();
  const {cancel} = router.query;
  return (
    <div>
      {/* we pass products we need to have access to via props */}
      <Search products={products} onFilterChange={handleFilterChange} />
      {/* an alert when user goes back during Stripe session */}
      {cancel && (
        <div className="alert alert-danger" role="alert">
          Don't worry. You can come back to payment session anytime you are ready
        </div>
      )}
      <div className="banner-container">
        <img src={shopBanner} alt="Etsy" className="banner-image" />
      </div>
      <h2 className="moon-ruby-shop">Moon Ruby Shop</h2>
      {/* here we display products */}
      <div className="products-shop">
        {(filteredProducts.length > 0 ? filteredProducts : products).map(
          (product) => (
            <div key={product.id} className="stuff-inside-products-div">
              <ProductCard product={product} />
              {/* <img className="product-image" src={product.image}></img>
                    <p>{product.type}</p>
                    <p>{product.price}</p>
                    <p>{product.description}</p> */}
            </div>
          )
        )}
      </div>
      <hr />
      <div className="reviews-shop">
        {/* here go reviews */}
        <h2 className="review-title">
          what other customers say about this shop
        </h2>
        {/* Map over the reviews and render each one */}
        {reviews.map((review) => (
          <div key={review.id} className="stuff-inside-reviews-div">
            <p data-tag="review">who: {review.name}</p> {}
            {review.review}
            {/* // {product.description} */}
            {/* // {review.name} */}
            {/* // <ProductCard key={review.description} review={review} /> */}
            {/* //   ))} */}
          </div>
        ))}
      </div>
      <hr />
      <div>{/* <p data-tag="faq-section">here goes shop policy</p> */}</div>
    </div>
  );
}
export default Shop;
