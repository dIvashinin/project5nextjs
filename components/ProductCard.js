import React from "react";
import Link from "next/link";
import { useShoppingCart } from "../context/shoppingCartContext";
// const cartIconLink = "https://res.cloudinary.com/dzghua4dz/image/upload/v1701695929/moonrubyshop/gh5xolsqgqhccxhb3fyt.svg";
import { useProduct } from "../context/productContext";

function ProductCard({ product }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const products = useProduct();
  console.log("products :>> ", products);
  // Check if product is defined
  if (!product) {
    return <p>Loading...</p>; // or handle the case where product is not available
  }

  const quantity = getItemQuantity(product.id);
  return (
    //i don't use this one made for another fetch
    // <div>
    //     <img src={product.image}></img>
    //     {product.title}
    //     {product.description}
    // </div>

    <div>
      <Link href={`/product/${product.id}`}>
        <a>
          <img src={product.image}></img>
        </a>
      </Link>
      <p data-tag="type">
        what: {product.type} {}
      </p>
      <p data-tag="price">
        price: {product.price}&euro; {}
      </p>
      <p data-tag="description">{product.description}</p>
      {/* <div> */}
      {/* <button className="add-to-cart-button" onClick={() => increaseCartQuantity(product.id, product)}> */}
      {/* try again later, now no time */}
      {/* <img className="cart-icon-svg-add-to" src={cartIconLink} alt="Cart" /> */}
      {/* + add to cart</button> */}
      {/* <button className="minus-to-cart-button" onClick={() => decreaseCartQuantity(product.id, product)}> */}
      {/* try again later, now no time */}
      {/* <img className="cart-icon-svg-add-to" src={cartIconLink} alt="Cart" /> */}
      {/* - remove</button> */}
      {/* </div> */}
    </div>
  );
}

export default ProductCard;
