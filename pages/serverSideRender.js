import React from 'react';

//here go next functio getServerSideProps. we check the documentation
export const getServerSideProps = () => {

}

function serverSideRender() {
  return (
    <div>
        
        <h1>Server Side Render</h1>
        <h3>this page is rendered in the server</h3>
    </div>
  )
}

export default serverSideRender