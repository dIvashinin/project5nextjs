import React from 'react';

//here go next functio getServerSideProps. we check the documentation
export const getServerSideProps = async () => {
const response = await fetch ("https://fakestoreapi.com/products/1");
const result = await response.json();
// this console.log is only happening in our server
// client doesn't have access to here, only to what i am returning here
console.log("where am I???");
return {
  props: {product: result},
};
};

function serverSideRender({product}) {
  // this console.log is being displayed in both: server&client
  console.log('product in my client :>> ', product);
  return (
    <div>
        
        <h1>Server Side Render</h1>
        <h3>this page is rendered in the server</h3>
        <div>
          <p>{product.description}</p>
          <p>{product.title}</p>
        </div>
    </div>
  )
}

export default serverSideRender