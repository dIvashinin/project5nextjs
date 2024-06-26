import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
// import { useShoppingCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";
import DropdownCategoryMenu from "../components/DropdownCategoryMenu";
import { Navbar } from "react-bootstrap";
import { useFilteredProducts } from "../context/FilteredProductsContext";

const shopBanner =
  // "https://res.cloudinary.com/dzghua4dz/image/upload/v1701986735/moonrubyshop/cgfdekd8afqoxuygrrgb.jpg";
  "https://res.cloudinary.com/dzghua4dz/image/upload/v1711134633/moonrubyshop/xqkxmaljehv9a8ecxn0t.jpg";

export const getStaticProps = async () => {
  try {
    const productsSnapshot = await getDocs(collection(db, "products2"));
    const products = [];
    productsSnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().description}`);
      // const imageUrls = doc.data().image;
      const imageUrls = Array.isArray(doc.data().image)
        ? doc.data().image
        : [doc.data().image];
      // console.log("doc.data().image :>> ", doc.data().image);
      // console.log("imageUrls inside shop.js :>> ", imageUrls);
      // || [];
      products.push({
        id: doc.id,
        type: doc.data().type,
        price: doc.data().price,
        description: doc.data().description,
        image: imageUrls,
      });
      // console.log('image inside shop.js :>> ', image);
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
      props: { initialProducts: products, reviews },
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

function Shop({ initialProducts, reviews }) {
  const router = useRouter();
  const { filteredProducts, setFilteredProducts } = useFilteredProducts();
  console.log("filteredProducts in shop before :>> ", filteredProducts);
  // const router = useRouter();
  useEffect(() => {
    const handleCleanup = () => {
      setFilteredProducts([]);
      console.log("filteredProducts in shop after :>> ", filteredProducts);
    };

    // here i define an array of destinations where to trigger cleanup
    const destinations = ["/", "/about", "/login", "/dashboard", "/faq"];

    // Listen for route changes
    const handleRouteChange = (url) => {
      if (destinations.includes(url)) {
        // Execute cleanup function when navigating away from the shop page
        handleCleanup();
      }
    };

    // Subscribe to route changes
    router.events.on("routeChangeStart", handleRouteChange);

    // Cleanup subscription
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, setFilteredProducts]);

  //    // Reset filteredProducts state when navigating away from the shop page
  //    if (router.pathname !== '/') {
  //     handleCleanup();
  //    }
  //    return () => {
  //     // cleanup function
  //     if (router.pathname !== '/') {
  //       handleCleanup();
  //    }
  //   };
  // }, [router.pathname, setFilteredProducts]);

  // const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
  // const quantity = getItemQuantity(id)
  // console.log('initialProducts :>> ', initialProducts);
  // const { filteredProducts, setFilteredProducts } = useFilteredProducts();
  // const { filteredProducts, setFilteredProducts } = useContext(FilteredProductsContext);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  // console.log('filteredProducts :>> ', filteredProducts);
  // const handleFilterChange = (filteredProducts) => {
  //   setFilteredProducts(filteredProducts);
  //   console.log('filteredProducts :>> ', filteredProducts);
  // }

  const [searchedProducts, setSearchedProducts] = useState([]);
  const handleSearchChange = (searchedProducts) => {
    setSearchedProducts(searchedProducts);
  };
  const { cancel } = router.query;
  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  //   console.log('category :>> ', category);
  //   console.log('selectedCategory :>> ', selectedCategory);
  //   // Filter products based on the selected category
  //   const filteredProducts = /* Filter products based on category */
  //   setFilteredProducts(filteredProducts);
  //   console.log('filteredProducts :>> ', filteredProducts);
  // };

  // Assuming filteredProducts, searchedProducts, and products are available in the component's state or props
  let displayedProducts = [];

  // Check if either filteredProducts or searchedProducts has items
  if (filteredProducts.length > 0) {
    // Display filtered products if available
    displayedProducts = filteredProducts;
  } else if (searchedProducts.length > 0) {
    // Display searched products if available
    displayedProducts = searchedProducts;
  } else {
    // Otherwise, display all products
    displayedProducts = initialProducts;
  }

  //i had an issue after implementing useRedirectOnCondition: in dashboard for ex.
  //when i choose category from offcanvas, filteredProducts are >0, redirect to shop/index
  //but filteredProducts stay >0, that's why if i want to get back to dashboard, i can't,
  //because the condition is still 'filteredProducts >0'

  // Reset filteredProducts state when navigating away from the shop page
  // return () => {
  // The cleanup function's purpose is to clean up any resources or side effects created by the effect
  // setFilteredProducts([]);
  // };
  // }, []);

  return (
    <div>
      {/* we pass products we need to have access to via props */}
      <Search products={initialProducts} onSearchChange={handleSearchChange} />

      {/* Navbar with button to open dropdown menu */}
      {/* <Navbar setFilteredProducts={setFilteredProducts} /> */}
      {/* <DropdownCategoryMenu setFilteredProducts={setFilteredProducts} /> */}
      {/* <DropdownCategoryMenu 
                filteredProducts={filteredProducts}
                onFilterChange={handleFilterChange}
            /> */}

      {/* an alert when user goes back during Stripe session */}
      {cancel && (
        <div className="alert alert-danger" role="alert">
          Don&apos;t worry. You can come back to payment session anytime you are
          ready
        </div>
      )}
      <div className="banner-container">
        <img src={shopBanner} alt="Etsy" className="banner-image" />
        <h2 className="moon-ruby-shop">Moon Ruby Shop</h2>
      </div>
      {/* <h2 className="moon-ruby-shop">Moon Ruby Shop</h2> */}

      <div>
        {/* <DropdownCategoryMenu handleCategoryClick={handleCategoryClick} /> */}

        {/* <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>*/}
      </div>

      {/* here we display products */}

      <div className="products-shop">
        {/* Render the products based on the condition */}
        {displayedProducts.map((product) => (
          <div key={product.id} className="stuff-inside-products-div">
            <ProductCard product={product} />
            {/* <img className="product-image" src={product.image}></img>
                    <p>{product.type}</p>
                    <p>{product.price}</p>
                    <p>{product.description}</p> */}
          </div>
        ))}
      </div>

      {/* <div className="products-shop"> */}
      {/* {(searchedProducts.length > 0 ? searchedProducts : products).map( */}
      {/* // (product) => ( */}
      {/* // <div key={product.id} className="stuff-inside-products-div"> */}
      {/* <ProductCard product={product} /> */}
      {/* <img className="product-image" src={product.image}></img>
                    <p>{product.type}</p>
                    <p>{product.price}</p>
                    <p>{product.description}</p> */}
      {/* </div> */}
      {/* // ) */}
      {/* // )} */}
      {/* </div> */}
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
