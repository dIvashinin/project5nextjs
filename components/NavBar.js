import React from 'react';
import Link from "next/link";

const cartIconLink = "https://res.cloudinary.com/dzghua4dz/image/upload/v1701695929/moonrubyshop/gh5xolsqgqhccxhb3fyt.svg";



function NavBar() {
  return (
    <div>
        <nav className='navigation-bar'>
            <Link href='/'>home</Link> {} 
            {/* <Link href='/clientSideRender'>clientSideRender</Link> {}  */}
            {/* <Link href='/serverSideRender'>serverSideRender</Link> {}  */}
            {/* <Link href='/staticSiteGeneration'>staticSiteGeneration</Link> {} */}
            <Link href='/login'>login</Link> {}
            {/* <Link href='/product'>products</Link> */}
            <Link href='/shop'>shop</Link>
            <button className="product-cart">
            <img className="cart-icon-svg" src={cartIconLink} alt="Cart" />

            </button>
            
        </nav>
    </div>
  )
}

export default NavBar