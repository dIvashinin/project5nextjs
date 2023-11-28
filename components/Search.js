import React, { useState } from 'react'



function Search({products}) {
    // State to track user input
  const [inputText, setInputText] = useState("");
  console.log('inputText :>> ', inputText);
  const [filteredProducts, setFilteredProducts] = useState([]);
// Function to handle changes in the search input
const inputChangeHandler = (e) => {
    // When the user types in the search input, this function updates the 'inputText' state with the text.
    // console.log("event.target.value :>> ", e.target.value);
    const text = e.target.value;
    setInputText(text);

    // filter posts based on the input text
    const filteredProducts = products.filter((product) => {
        return (
            product.description.toLowerCase().includes(text.toLowerCase()) ||
            product.type.toLowerCase().includes(text.toLowerCase())
        );
      });
      // Update the filtered posts
      setFilteredProducts(filteredProducts);
      console.log('filteredProducts :>> ', filteredProducts);
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
      </div>
  )
}

export default Search;