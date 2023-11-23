import React from 'react';

import {useRouter} from "next/router";
import ProductCard from '../../components/ProductCard';

//in order to be able to understand what i mean by 'id' in my dynamic route
// we need to use this special next function
export const getStaticPaths =  () => {
    //so we specify what things we want to be ready, for example these 4 items,
    //we can call slug whatever we want, for ex productIds etc
   const slugs = ["1","2","3","4"]
const paths = slugs.map((slug) => {
    return{
        params: {
            productId: slug
        },
    };
});
console.log('paths :>> ', paths);
return {
    paths,
    // fallback false means: if we try to visit url/path of not existing product, we get 404 screen
    // if fallback is true, we just get an error which we need to handle, so better: FALSE
    fallback: false,
};
};
//we pass 'context' from getStaticPaths to getStaticProps
export const getStaticProps = async (context) => {
    console.log('context :>> ', context);
    const id = context.params.productId;
    const response = await fetch (`https://fakestoreapi.com/products/${id}`);
    const result = await response.json();

    return{
        props: {product:result},
        //BUT!!! if we want this static site generation to render from time to time, we use revalidate
        //we have it in seconds
        // revalidate: 30 
     };

}

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