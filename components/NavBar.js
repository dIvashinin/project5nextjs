import React from "react";
import Link from "next/link";
// import Search from "../components/Search";
import { useShoppingCart } from "../context/ShoppingCartContext";
import ProtectedRoute from "./ProtectedRoute";

const rubyIconLink = "https://res.cloudinary.com/dzghua4dz/image/upload/v1711641682/moonrubyshop/psesrg9faps669tssbvv.svg";

const cartIconLink =
  "https://res.cloudinary.com/dzghua4dz/image/upload/v1701695929/moonrubyshop/gh5xolsqgqhccxhb3fyt.svg";

function NavBar() {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <div>
      <nav className="navigation-bar">
        {/* <Link href='/clientSideRender'>clientSideRender</Link> {}  */}
        {/* <Link href='/serverSideRender'>serverSideRender</Link> {}  */}
        {/* <Link href='/staticSiteGeneration'>staticSiteGeneration</Link> {} */}
        {/* <Link href="/shop">shop</Link> {} */}
        {/* <Link href='/product'>products</Link> */}
        {/* now shop is index */}
        <div>
        <button className="filter-category-dropdown" 
        // onClick={openCart}
        >
          <img className="ruby-svg" src={rubyIconLink} alt="Ruby" />
          {/* <div className="inside-cart-number-products">{cartQuantity}</div> */}
        </button>
        </div>

        <Link href="/">shop</Link> {}
        <Link href="/about">about</Link> {}
        <Link href="/login">login</Link> {}
        <ProtectedRoute>
          <Link href="/dashboard">dash</Link> {}
        </ProtectedRoute>
        <button className="product-cart" onClick={openCart}>
          <img className="cart-icon-svg" src={cartIconLink} alt="Cart" />
          <div className="inside-cart-number-products">{cartQuantity}</div>
        </button>
      </nav>
    </div>
  );
}
export default NavBar;