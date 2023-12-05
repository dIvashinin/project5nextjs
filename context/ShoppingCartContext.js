import {createContext, useContext} from "react";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider ({children}) {
    return (
    <ShoppingCartContext.Provider value={{}}> 
    {children}
    </ShoppingCartContext.Provider>
    )
}