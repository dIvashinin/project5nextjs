import {createContext, useContext, useState} from "react";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider ({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id) {
        return cartItems.find(item => item.id)?.quantity || 0
    }
//add to cart function
    function increaseCartQuantity (id) {
        //current items are whatever our list of current items are
        setCartItems(currItems => {
            //and we need to modify the list
            //if we can find an item inside our cart, that means we have this item
            //but if we can't find it, we need to add it to our cart
            if (currItems.find(item => item.id === id) == null) {
                // return all our current items and add new item with an id= and quantity of 1
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity (id) {
        setCartItems(currItems => {
            //if quantity of our item is 1 we get rid of it
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                //we take our current items, filter them per item, our id is not equal to our current id
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else{
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart (id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)   
        })

    }

    return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity}}> 
    {children}
    </ShoppingCartContext.Provider>
    )
}