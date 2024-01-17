import React from 'react'

//we can create for every error this kind of pages
const notFoundPageBackground = "https://res.cloudinary.com/dzghua4dz/image/upload/v1705325724/moonrubyshop/nygvgkwzp5zvfijgvmbo.jpg"

function NotFoundPage() {
  return (
    <div className='not-found-container'>
      <div className='not-found-background-container'>
      <img src={notFoundPageBackground} alt="Etsy" className="not-found-image" />
      </div>
    <h2>it seems like there's an oops happening</h2>
    <h2>probably this page doesn't exist at all</h2>
    </div>
    )
};

export default NotFoundPage;