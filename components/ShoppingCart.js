import {Offcanvas, Stack} from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import CartItem from "./CartItem";
import { useProduct } from "../context/productContext";



export function ShoppingCart({isOpen, items}) {
    const {closeCart, cartItems} = useShoppingCart();
    const products = useProduct();
    console.log('cartItems :>> ', cartItems);
    console.log('products :>> ', products);
    return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>  
        </Offcanvas.Header>
        {/* in order to have our added to cart items visible */}
        <Offcanvas.Body>
            <Stack gap={3}>
            {cartItems.map((item) => (
               <div key={item.id}>
                <img src={item.image} style={{width:"125px", height:"75px", objectFit: "cover"}}></img>
               <p data-tag="type">what: {item.type}</p>
               <p data-tag="price">price: {item.price}Eur</p>
               {/* other properties */}
           </div>
            // <CartItem key={item.id} {...item} product={product} />
            ))}
            
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    )
}