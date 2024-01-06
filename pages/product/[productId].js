import React from 'react';
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useProduct } from "../../context/productContext";
import {useRouter} from "next/router";
import ProductCard from '../../components/ProductCard';
import SingleProductComponent from '../../components/SingleProductComponent';

//in order to be able to understand what i mean by 'id' in my dynamic route
// we need to use this special next function
//here the 1st version when we hardcoded ids 1,2,3,4 etc
// export const getStaticPaths =  () => {
    //so we specify what things we want to be ready, for example these 4 items,
    //we can call slug whatever we want, for ex productIds etc
    //in this case we know the ids, but we might not know them and
    // will need to loop through an array and get them in another function
    // and then use
    // we hardcoding our product ids here
//    const slugs = ["1","2","3","4"]
// const paths = slugs.map((slug) => {
    // return{
        // params: {
            // productId: slug
        // },
    // };
// });
// console.log('paths :>> ', paths);
//here 2nd version
// export const getStaticPaths = async () => {
//     // Fetch product IDs from my database or API
//     const productsSnapshot = await getDocs(collection(db, "products"));
//     const productIds = productsSnapshot.docs.map((doc) => doc.id);
  
//     // Generate paths based on the fetched product IDs
//     const paths = productIds.map((id) => ({ params: { productId: id.toString() } }));
  
// return {
//     paths,
//     // fallback false means: if we try to visit url/path of not existing product, we get 404 screen
//     // if fallback is true, we just get an error which we need to handle, so better: FALSE
//     fallback: false,
// };
// };

// //we pass 'context' from getStaticPaths to getStaticProps
// //this was 1st variant for fakestore
// // export const getStaticProps = async (context) => {
// //     console.log('context :>> ', context);
// //     const id = context.params.productId;
// //     const response = await fetch (`https://fakestoreapi.com/products/${id}`);
// //     const result = await response.json();

// //     return{
// //         props: {product:result},
// //         //BUT!!! if we want this static site generation to render from time to time, we use revalidate
// //         //we have it in seconds
// //         // revalidate: 30 
// //      };

// // }
// //here 2nd variant

// // export const getStaticProps = async (context) => {
   
// // try {
// //     const productId = context.params.productId;  // Get the productId from context
// //     const productDoc = await getDoc(doc(db, "products", productId));  // Fetch the specific product document
// //     const productData = productDoc.data();  // Extract the data from the document

// //     // Check if the product exists
// //     if (!productData) {
// //       return {
// //         notFound: true,  // Return 404 if the product is not found
// //       };
// //     }
    
// //     const product = {
// //       id: productId,
// //       type: productData.type,
// //       price: productData.price,
// //       description: productData.description,
// //       image: productData.image,
// //     };
// //     console.log('Product in getStaticProps:', product);

// //     return {
// //       props: { product },
// //       // Set revalidation time
// //       revalidate: 60,
// //     };
// //   } catch (error) {
// //     console.error("Error fetching product:", error.message);
// //     return {
// //       props: { product: null },  // You might want to handle this case in your component
// //     };
// //   }
// // };
// //3rd using productContext
// export const getStaticProps = async (context) => {
//     try {
//       const productId = context.params.productId;
//       const products = useProduct(); // Use the context to get the products
  
//       // Fetch the specific product document
//       const productDoc = await getDoc(doc(db, "products", productId));
//       const productData = productDoc.data();
  
//       if (!productData) {
//         return {
//           notFound: true,
//         };
//       }
  
//       const product = {
//         id: productId,
//         type: productData.type,
//         price: productData.price,
//         description: productData.description,
//         image: productData.image,
//       };
  
//       return {
//         props: { product },
//         revalidate: 60,
//       };
//     } catch (error) {
//       console.error("Error fetching product:", error.message);
//       return {
//         props: { product: null },
//       };
//     }
//   };

// function SingleProduct({product}) {
//     const router = useRouter();
//     console.log('Product:', product);
//     if (!product) {
//         // You might want to show a loading spinner or an error message here
//         return <p>Loading...</p>;
//       }
//   return (
//     <div 
//     // key={product.id}
//     >
//         {/* info about product {router.query.productId}
//         <p>{product.title}</p>
//         <p>{product.price}</p> */}
//         {/* import here my product card component, passing props product which we receive above*/}
//         {/* <div key={product.id} className="stuff-inside-products-div"> */}
//               <ProductCard product={product} />
//         {/* <ProductCard product={product}/> */}
//     </div>
    
//   )
// }

// export default SingleProduct;

function SingleProduct({ product }) {
    // Check if product is defined
    if (!product) {
      return <p></p>; // or handle the case where product is not available
    }
  
    return (
        
        <div key={product.id} className="stuff-inside-products-div">
              {/* <ProductCard product={product} /> */}
              <SingleProductComponent product={product} />
              </div>

    //   <div>
    //     {/* Display product details */}
    //     <p>{product.type}</p>
    //     <p>{product.price}&euro;</p>
    //     <p>{product.description}</p>
    //     {/* You can add more details as needed */}
    //   </div>
    );
  }
  
  // Fetch data on each request
  export const getServerSideProps = async (context) => {
    try {
      const productId = context.params.productId;
      const productDoc = await getDoc(doc(db, "products", productId));
      const productData = productDoc.data();
  
      // Check if the product exists
      if (!productData) {
        return {
          notFound: true,
        };
      }
  
      const product = {
        id: productId,
        type: productData.type,
        price: productData.price,
        description: productData.description,
        image: productData.image,
      };
  
      return {
        props: { product },
      };
    } catch (error) {
      console.error("Error fetching product:", error.message);
      return {
        props: { product: null },
      };
    }
  };
  
  export default SingleProduct;