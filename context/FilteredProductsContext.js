// 1. Create a context
import React, { createContext, useContext, useState } from 'react';

const FilteredProductsContext = createContext();

// 2. Provider component
export const FilteredProductsProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <FilteredProductsContext.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </FilteredProductsContext.Provider>
  );
};