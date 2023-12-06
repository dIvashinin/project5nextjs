import React, { useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ProductCard from './ProductCard';


// we pass products as props
function Search({products, onFilterChange}) {
    // State to track user input
  const [inputText, setInputText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log('inputText :>> ', inputText);
  // console.log('products search :>> ', products);
//   const [filteredProducts, setFilteredProducts] = useState([]);
// Function to handle changes in the search input
const inputChangeHandler =  (e) => {
    // When the user types in the search input, this function updates the 'inputText' state with the text.
    // console.log("event.target.value :>> ", e.target.value);
    const text = e.target.value;
    setInputText(text);

    //fetch products from firebase based on input. 
    //Client Side Rendering
    // const querySnapshot = await getDocs(collection(db, 'products'));
    // const filteredProducts = [];
    // querySnapshot.forEach((doc) => {
    //     const product = doc.data();
    //     if (
        const filteredProducts = products.filter((product) =>
            product.description.toLowerCase().includes(text.toLowerCase()) ||
            product.price.toLowerCase().includes(text.toLowerCase()) ||
            product.type.toLowerCase().includes(text.toLowerCase())
            );
            // Update the parent component (Shop) with the filtered products
            onFilterChange(filteredProducts);
            // console.log('filteredProducts :>> ', filteredProducts);

        // ){
        //     filteredProducts.push({
        //         id: doc.id,
        //         type: product.type,
        //         price: product.price,
        //         description: product.description,
        //         image: product.image,
        //     });
        
    
    
      // Update the filtered posts
    //   setFilteredProducts(filteredProducts);
      
    };

  return (
    <div className="searchbar">
        <input
          id="mySearchInput"
          className="search-input"
          type="text"
          placeholder="search me..."
          onChange={inputChangeHandler}
        />
        {/* <button onSubmit={handleSearchSubmit}>go</button> */}

        <div className="filtered-products">
            {filteredProducts.map((product) => (
                <div key = {product.id} className="stuff-inside-products-div">
                <ProductCard product={product} />

                </div>
            ))}

        </div>

      </div>
  );
}

export default Search;