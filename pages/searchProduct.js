import Head from 'next/head'
import React from 'react'

function searchProduct() {
    console.log(process.env.NEXT_PUBLIC_SECRET);
    //this one below will be only visisble in terminal, but undefined in console!
    console.log(process.env.SECRET);
  return (
    <>
    {/* we can add titles to every single page we create by importing Head... title etc... */}
    <Head>
        <title>
            search product
        </title>
    </Head>
    <div>searchProduct</div>


    </>

  )
}

export default searchProduct