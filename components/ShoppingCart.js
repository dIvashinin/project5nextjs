import {Offcanvas, Stack} from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import CartItem from "./CartItem";


export function ShoppingCart({isOpen, product}) {
    const {closeCart, cartItems} = useShoppingCart();
    // console.log('item :>> ', item);
    console.log('product :>> ', product);
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