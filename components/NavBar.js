import React from 'react'
import Link from "next/link"

function NavBar() {
  return (
    <div>
        <nav>
            <Link href='/'>home</Link> {} <Link href='/clientSideRender'>clientSideRender</Link>
            
        </nav>
    </div>
  )
}

export default NavBar