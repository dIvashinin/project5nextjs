import React from "react";
import Link from "next/link";
import { useShoppingCart } from "../context/shoppingCartContext";

function SingleProductCard({ product}) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // Check if product is defined
  if (!product) {
    return <p>Loading...</p>; // or handle the case where product is not available
  }

  const quantity = getItemQuantity(product.id);

  return (
    <div>
      <Link href={`/product/${product.id}`}>
        <a>
          <img src={product.image} alt={product.type} />
        </a>
      </Link>
      <p data-tag="type">what: {product.type}</p>
      <p data-tag="price">price: {product.price}&euro;</p>
      <p data-tag="description">{product.description}</p>

      
        
      

      {/* Additional options for the single product page */}
      <div>
        <label>
          Color:
          <select>
            {/* Add color options based on your data */}
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Size:
          <select>
            {/* Add size options based on your data */}
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>

      <div>
          <button
            className="add-to-cart-button"
            onClick={() => increaseCartQuantity(product.id, product)}
          >
            + add to cart
          </button>
          <button
            className="minus-to-cart-button"
            onClick={() => decreaseCartQuantity(product.id, product)}
          >
            - remove
          </button>
        </div>

      {/* Display additional images */}
      {product.additionalImages && (
        <div>
          {product.additionalImages.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index + 2}`} />
          ))}
        </div>
      )}

      {/* Additional product information */}
      <div>
        <h2>Product Information</h2>
        <p>Delivery information: ...</p>
        <p>Return policy: ...</p>
        {/* Add more information as needed */}
      </div>
    </div>
  );
}

export default SingleProductCard;
