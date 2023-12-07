import {createContext, useContext, useState} from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider ({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    //in order to have our items not disappear after refresh we can use 
    // custom hook - useLocalStorage instead of useState
    // const [cartItems, setCartItems] = useLocalStorage("shopping-cart",[])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)
    console.log('cartItems :>> ', cartItems);
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id) {
        return cartItems.find(item => item.id)?.quantity || 0
    }
//add to cart function
    function increaseCartQuantity (id, productInfo) {
        //current items are whatever our list of current items is
        setCartItems((currItems) => {
            console.log('currItems :>> ', currItems);
            // Check if the item is already in the cart
    const existingItem = currItems.find((item) => item.id === id);
    if (!existingItem) {
        // If the item is not in the cart, add it with complete product info
        return [...currItems, { id, quantity: 1, ...productInfo }];
            //and we need to modify the list
            //if we can find an item inside our cart, that means we have this item
            //but if we can't find it, we need to add it to our cart
            // if (currItems.find(item => item.id === id) == null) {
                // return all our current items and add new item with an id= and quantity of 1
                // return [...currItems, {id, quantity: 1}]
            } else {
                // If the item is already in the cart, update the quantity
                return currItems.map((item) => 
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
                }
        });
    }

    function decreaseCartQuantity (id) {
        setCartItems((currItems) => {
            const existingItem = currItems.find((item) => item.id === id);
            if (existingItem && existingItem.quantity === 1) {
                // If the item quantity is 1, remove it from the cart
                return currItems.filter((item) => item.id !== id);
              } else {
                // If the item quantity is more than 1, decrease the quantity
                return currItems.map((item) =>
                  item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
              }
            });
          }
    //         //if quantity of our item is 1 we get rid of it
    //         if (currItems.find(item => item.id === id)?.quantity === 1) {
    //             //we take our current items, filter them per item, our id is not equal to our current id
    //             return currItems.filter(item => item.id !== id)
    //         } else {
    //             return currItems.map(item => {
    //                 if (item.id === id) {
    //                     return {...item, quantity: item.quantity - 1}
    //                 } else{
    //                     return item
    //                 }
    //             })
    //         }
    //     })
    // }

    function removeFromCart (id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)   
        })

    }

    return (
    <ShoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartItems, cartQuantity}}> 
    {children}
    <ShoppingCart isOpen={isOpen}/>    
    </ShoppingCartContext.Provider>
    )
}