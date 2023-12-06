import { useShoppingCart } from "../context/shoppingCartContext";
import {Offcanvas, Stack} from "react-bootstrap";

function CartItem({id, quantity, product}) {
    const {removeFromCart, increaseCartQuantity, decreaseCartQuantity, cartItems} = useShoppingCart();
    // const product = products && products.find(product => product.id === id);
    return(
        
        
        
            // <div className="added-to-cart-container" key={id}>
            //  <img src={product.image} style={{width:"125px", height:"75px", objectFit: "cover"}}></img>
            // <p data-tag="type">what: {product.type}</p>
            // <p data-tag="price">price: {product.price} Eur</p>
            // <p data-tag="quantity">{quantity} pcs</p>
            // <p data-tag="total">total: {product.price*quantity} Eur</p>
            {/* other properties */}
        // </div>
        
        
        
    );
}

export default CartItem;