import React from 'react';
import Head from "next/head";

// here the thing is we will get an item always the same (we specify
// this item once we deploy our project
// unless we use some time specific ,which comes later
export const getStaticProps = async () => {
const randomId =Math.floor(Math.random()*19);
const response = await fetch (`https://fakestoreapi.com/products/${randomId}`);
const result = await response.json();

return{
   props: {product:result},  
};
};

//we receive here in our function below props from getStaticProps
function staticSiteGeneration({product}) {
  return (
    <div>
        <Head>
            <title key="title">Fake store: random product</title>
        </Head>
        <h1>check a random product every time</h1>
        <h3>this page is rendered already in the server</h3>
        <div>
          <p>{product.description}</p>
          <p>{product.title}</p>
        </div>
        </div>
  )
}

export default staticSiteGeneration;