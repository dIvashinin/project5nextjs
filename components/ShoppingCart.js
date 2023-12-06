import {Offcanvas, Stack} from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import CartItem from "./CartItem";
import { useProduct } from "../context/productContext";



export function ShoppingCart({isOpen}) {
    const {closeCart, cartItems, removeFromCart, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();
    const products = useProduct();
    // console.log('cartItems :>> ', cartItems);
    // console.log('products :>> ', products);
    return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Added to cart</Offcanvas.Title>  
        </Offcanvas.Header>
        {/* in order to have our added to cart items visible */}
        <Offcanvas.Body>
            <Stack gap={1}>
            {cartItems.map((item) => (
               <div className="added-to-cart-container" key={item.id}>
                <img src={item.image} style={{width:"125px", height:"75px", objectFit: "cover"}}></img>
               <p data-tag="type">what: {item.type}</p>
               <p data-tag="price">price: {item.price} Eur</p>
               <p data-tag="quantity">{item.quantity} pcs</p>
               <p data-tag="total">total: {item.price*item.quantity} Eur</p>
               <button onClick={() => increaseCartQuantity(item.id, products)}>+</button>
               <button onClick={() => decreaseCartQuantity(item.id, products)}>-</button>
               <button onClick={() => removeFromCart(item.id, products)}>delete</button>
               {/* other properties */}
           </div>
            // <CartItem key={item.id} {...item} product={product} />
            ))}
            
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    )
}