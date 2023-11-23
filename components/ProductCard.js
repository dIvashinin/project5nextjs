import React from 'react'

function ProductCard({product}) {
  return (
    <div>
        <img src={product.image}></img>
        {product.title}
        {product.description}
    </div>
  );
}

export default ProductCard