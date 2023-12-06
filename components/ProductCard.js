import React from "react";
import { useShoppingCart } from "../context/shoppingCartContext";
// const cartIconLink = "https://res.cloudinary.com/dzghua4dz/image/upload/v1701695929/moonrubyshop/gh5xolsqgqhccxhb3fyt.svg";

function ProductCard({ product }) {
  const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
  const quantity = getItemQuantity(product.id);
  return (
    //i don't use this one made for another fetch
    // <div>
    //     <img src={product.image}></img>
    //     {product.title}
    //     {product.description}
    // </div>

    <div>
      <img src={product.image}></img>
      <p data-tag="type">
        what: {product.type} {}
      </p>
      <p data-tag="price">
        price: {product.price}Eur {}
      </p>
      <p data-tag="description">{product.description}</p>
      <div>
      <button className="add-to-cart-button" onClick={() => increaseCartQuantity(product.id, product)}>
        {/* try again later, now no time */}
      {/* <img className="cart-icon-svg-add-to" src={cartIconLink} alt="Cart" /> */}
        + add to cart</button>
        <button className="minus-to-cart-button" onClick={() => decreaseCartQuantity(product.id, product)}>
        {/* try again later, now no time */}
      {/* <img className="cart-icon-svg-add-to" src={cartIconLink} alt="Cart" /> */}
        - remove</button>
        </div>
    </div>
  );
}

export default ProductCard;
