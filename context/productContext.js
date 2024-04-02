import React , {createContext, useContext, useEffect, useState} from 'react';

const ProductContext = createContext();

export function useProduct() {
    return useContext(ProductContext);
}

export function ProductProvider({children, initialProducts}) {
    // console.log('products context :>> ', products);
    console.log('initialProducts :>> ', initialProducts);
    const [products, setProducts] = useState(initialProducts);

    useEffect(() => {
        console.log('products after setting state:', products);
    }, []);

    console.log('products :>> ', products);
    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    );
}