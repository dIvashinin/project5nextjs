import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SingleProductCard from "../components/SingleProductComponent";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  //in order to have our items not disappear after refresh we can use
  // custom hook - useLocalStorage instead of useState
  // const [cartItems, setCartItems] = useLocalStorage("shopping-cart",[])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Calculate total quantity
  const totalQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  // console.log('cartItems :>> ', cartItems);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  function getItemQuantity(id) {
    return cartItems.find((item) => item.id)?.quantity || 0;
  }
  //add to cart function
  function increaseCartQuantity(id, productInfo, color, size) {
    console.log("id incr:", id);
    console.log("productInfo incr :>> ", productInfo);
    console.log("color incr:", color);
    console.log("size incr:", size);
    //current items are whatever our list of current items is
    setCartItems((currItems) => {
      //however i see prev state because it's async
      console.log("currItems increase:", currItems);
      // console.log('currItems :>> ', currItems);
      // Check if the item is already in the cart
      const existingItem = currItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );

      // const selectedColor = color;
      if (!existingItem) {
        // If the item is not in the cart, add it with complete product info
        return [...currItems, { id, quantity: 1, color, size, ...productInfo }];
        //and we need to modify the list
        //if we can find an item inside our cart, that means we have this item
        //but if we can't find it, we need to add it to our cart
        // if (currItems.find(item => item.id === id) == null) {
        // return all our current items and add new item with an id= and quantity of 1
        // return [...currItems, {id, quantity: 1}]
      } else {
        // If the item is already in the cart, update the quantity
        return currItems.map((item) =>
          item.id === id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  }

  function decreaseCartQuantity(id, color, size) {
    console.log("id decr:", id);
    console.log("color decr:", color);
    console.log("size decr:", size);
    setCartItems((currItems) => {
      //however i see prev state because it's async
      console.log("currItems decr:", currItems);
      const existingItem = currItems.find(
        (item) => item.id === id && item.color === color && item.size === size
      );
      console.log("existingItem :>> ", existingItem);
      // const existingItem = currItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity === 1) {
        // If the item quantity is 1, remove remove only the item with the specified color and size
        return currItems.filter(
          (item) =>
            !(item.id === id && item.color === color && item.size === size)
        );
      } else {
        console.log("else decrease...-1");
        // If the item quantity is more than 1, decrease the quantity caring about color and size as well
        return currItems.map((item) =>
          item.id === id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
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

  function removeFromCart(id, color, size) {
    console.log("id rem:", id);
    console.log("color rem:", color);
    console.log("size rem:", size);
    setCartItems((currItems) => {
      console.log("currItems rem:", currItems);
      //however i see prev state because it's async
      return currItems.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      );
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        totalSum,
        totalQuantity,
      }}
    >
      {children}
      <SingleProductCard />
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
