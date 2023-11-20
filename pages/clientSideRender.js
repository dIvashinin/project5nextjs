import React, { useEffect, useState } from 'react';

//when we are using typescript, we can google 'json to typescript', paste our json file and see how the types are transformed

function ClientSideRender() {
    //we need to capitalize function name in order to use useState! as a component
    const [products, setProducts] = useState()

    useEffect(() => {
      const fetchProduct = async () => {
        try {
            const response = await fetch ("https://fakestoreapi.com/products");
            if (response.ok) {
                const result = await response.json();
                console.log('result :>> ', result);
                setProducts(result);
            } else {
                alert("server response not ok");
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
      };
    
      fetchProduct();

      return () => {
        
      }
    }, [])
    

  return (
    <div>
        
        <h1>Client Side Render </h1>
        <h3>this page is rendered by the browser</h3>
        <div>
            <h2>products list</h2>
            {products && products.map((product) => {
return (
<div key={product.id}>
    <p>{product.id}</p>
    <p>{product.description}</p>
    <p>{product.price}</p>
</div>)
            })}
        </div>

        </div>
  )
}

export default ClientSideRender