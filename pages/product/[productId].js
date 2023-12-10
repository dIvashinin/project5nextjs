import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import {useRouter} from "next/router";
import ProductCard from '../../components/ProductCard';

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
export const getStaticPaths = async () => {
    // Fetch product IDs from your database or API
    const productsSnapshot = await getDocs(collection(db, "products"));
    const productIds = productsSnapshot.docs.map((doc) => doc.id);
  
    // Generate paths based on the fetched product IDs
    const paths = productIds.map((id) => ({ params: { productId: id.toString() } }));
  
return {
    paths,
    // fallback false means: if we try to visit url/path of not existing product, we get 404 screen
    // if fallback is true, we just get an error which we need to handle, so better: FALSE
    fallback: false,
};
};
//we pass 'context' from getStaticPaths to getStaticProps
//this was 1st variant for fakestore
// export const getStaticProps = async (context) => {
//     console.log('context :>> ', context);
//     const id = context.params.productId;
//     const response = await fetch (`https://fakestoreapi.com/products/${id}`);
//     const result = await response.json();

//     return{
//         props: {product:result},
//         //BUT!!! if we want this static site generation to render from time to time, we use revalidate
//         //we have it in seconds
//         // revalidate: 30 
//      };

// }
//here 2nd variant
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
      return {
        props: { products },
        //will change this later, now it's 60 sec
        revalidate: 60,
      };
    } catch (error) {
      console.error("error fetching products:", error.message);
      return {
        props: { products: []},
        //     // revalidate: 60,
      };
    }
  };

function SingleProduct({product}) {
    const router = useRouter()
  return (
    <div>
        {/* info about product {router.query.productId}
        <p>{product.title}</p>
        <p>{product.price}</p> */}
        {/* import here my product card component, passing props product which we receive above*/}
        <ProductCard product={product}/>
    </div>
    
  )
}

export default SingleProduct;