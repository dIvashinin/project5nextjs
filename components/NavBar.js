import React from 'react';
import Link from "next/link";



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
            <button className="product-cart">cart

            </button>
            
        </nav>
    </div>
  )
}

export default NavBar