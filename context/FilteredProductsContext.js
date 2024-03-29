// 1. Create a context
import React, { createContext, useContext, useState } from 'react';

const FilteredProductsContext = createContext();
export const useFilteredProducts = () => useContext(FilteredProductsContext);

// 2. Provider component
export const FilteredProductsProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
console.log('filteredProducts :>> ', filteredProducts);
  return (
    <FilteredProductsContext.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </FilteredProductsContext.Provider>
  );
};