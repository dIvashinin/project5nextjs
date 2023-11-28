import React, { useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import ProductCard from './ProductCard';

// we pass products as props
function Search({}) {
    // State to track user input
  const [inputText, setInputText] = useState("");
  console.log('inputText :>> ', inputText);
  const [filteredProducts, setFilteredProducts] = useState([]);
// Function to handle changes in the search input
const inputChangeHandler = async (e) => {
    // When the user types in the search input, this function updates the 'inputText' state with the text.
    // console.log("event.target.value :>> ", e.target.value);
    const text = e.target.value;
    setInputText(text);

    //fetch products from firebase based on input. 
    //Client Side Rendering
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (
            product.description.toLowerCase().includes(text.toLowerCase()) ||
            product.price.toLowerCase().includes(text.toLowerCase()) ||
            product.type.toLowerCase().includes(text.toLowerCase())
        ){
            products.push({
                id: doc.id,
                type: product.type,
                price: product.price,
                description: product.description,
                image: product.image,
            });
        }
    });
    
      // Update the filtered posts
      setFilteredProducts(products);
      
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