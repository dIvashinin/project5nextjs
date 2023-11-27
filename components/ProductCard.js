import React from 'react'

function ProductCard({product}) {
  return (
    //i don't use this one made for another fetch
    // <div>
    //     <img src={product.image}></img>
    //     {product.title}
    //     {product.description}
    // </div>

<>
<img src={product.image}></img>
{product.type}
{product.price}
{product.description}
</>

  );
}

export default ProductCard;