import React from 'react';
import Link from "next/link";

function product() {
  return (
    <div>
        <nav >
        {/* <Link href={`/product/${product.id}`}>
  <a>
      <img src={product.image}></img>
      </a>
</Link> */}
            <Link href='/product/1'>product1</Link> { }
            <Link href='/product/2'>product2</Link> { }
            <Link href='/product/3'>product3</Link> { }
            <Link href='/product/4'>product4</Link>
            </nav>
    </div>
  )
}

export default product;