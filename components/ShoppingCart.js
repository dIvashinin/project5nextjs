import {Offcanvas, Stack} from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import CartItem from "./CartItem";


export function ShoppingCart({isOpen, products}) {
    const {closeCart, cartItems} = useShoppingCart();
    
    return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>  
        </Offcanvas.Header>
        {/* in order to have our added to cart items visible */}
        <Offcanvas.Body>
            <Stack gap={3}>
            {cartItems.map(item => (
            <CartItem key={item.id} {...item} products={products} />
            ))}
            
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
    )
}