import React , {createContext, useContext} from 'react';

const ProductContext = createContext();

export function useProduct() {
    return useContext(ProductContext);
}

export function ProductProvider({children, products}) {
    return(
        <ProductContext.Provider value={products}>
            {children}
        </ProductContext.Provider>
    );
}