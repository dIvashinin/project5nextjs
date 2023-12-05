import { useShoppingCart } from "../context/shoppingCartContext";
import {Offcanvas, Stack} from "react-bootstrap";

function CartItem({id, quantity, product}) {
    const {removeFromCart, increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();
    // const product = products && products.find(product => product.id === id);
    return(
        // <Stack direction="horizontal" gap={2}>
          <div>
            {/* Only render the product if it exists */}
        {product && (
            <>
      <img src={product.image} style={{width:"125px", height:"75px", objectFit: "cover"}}></img>
      <p data-tag="type">
        what: {product.type} {}
      </p>
      <p data-tag="price">
        price: {product.price}Eur {}
      </p>
      </>
      )}
      </div>  
        // </Stack>
    );
}

export default CartItem;