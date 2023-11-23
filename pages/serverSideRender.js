import React from 'react';
import ProductCard from '../components/ProductCard';

//here goes next function getServerSideProps, which gives us a possibility 
// to pre-render stuff and display it without any useState useEffect as before
// we check the documentation
export const getServerSideProps = async () => {
const response = await fetch ("https://fakestoreapi.com/products/1");
const result = await response.json();
// this console.log is only happening in our server
// client doesn't have access to here, only to what i am returning here
console.log("this is visible only in terminal");
return {
  props: {product: result},
};
};

function serverSideRender({product}) {
  // this console.log is being displayed in both: server&client
  console.log('product in my client :>> ', product);
  console.log('this one is visible in both - terminal and browser');
  return (
    <div>
        
        <h1>Server Side Render</h1>
        <h3>this page is rendered in the server</h3>
        {/* <div>
          <p>{product.description}</p>
          <p>{product.title}</p>
        </div> */}
        <ProductCard product={product}/>
    </div>
  )
}

export default serverSideRender