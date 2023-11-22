import React from 'react';

import {useRouter} from "next/router";

//in order to be able to understand what i mean by 'id' in my dynamic route
// we need to use this special next function
export const getStaticPaths = async () => {
    //so we specify what things we want to be ready, for example these 4 items,
   const slugs = ["1","2","3","4"]
const paths = slugs
}

export const getStaticProps = async () => {
    const response = await fetch (`https://fakestoreapi.com/products/${id}`);
    const result = await response.json();

    return{
        props: {product:result},
        //BUT!!! if we want this static site generation to render from time to time, we use revalidate
        //we have it in seconds
        revalidate: 30 
     };
}

function SingleProduct({}) {
    const router = useRouter()
  return (
    <div>
        info about product {router.query.productId}
    </div>
  )
}

export default SingleProduct;