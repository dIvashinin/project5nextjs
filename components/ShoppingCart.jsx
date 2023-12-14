import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
// import CartItem from "./CartItem";
import { useProduct } from "../context/productContext";
import Checkout from "./Checkout";
import { useState } from "react";

// import { ShoppingCart } from "../components/ShoppingCart";

export function ShoppingCart({ isOpen }) {
  const {
    closeCart,
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();
  const products = useProduct();
  // console.log('cartItems :>> ', cartItems);
  // console.log('products :>> ', products);

  // State to manage whether the checkout form is open
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate total quantity
  const totalQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  // Determine the message based on the number of items
  let cartMessage;
  if (totalQuantity === 0) {
    cartMessage = "Oops! Your cart is empty. Please add some items.";
  } else if (totalQuantity === 1) {
    cartMessage =
      "Wow! That's a cool and amazing choice. You have 1 item in your cart.";
  } else if (totalQuantity === 2) {
    cartMessage = "You have 2 items in your cart. Great choices!";
  } else {
    cartMessage = `You have ${totalQuantity} items in your cart. Amazing!`;
  }

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };
  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    // closeCart();
  };

  // useEffect(() => {
  //   if (checkoutOpen) {
  //     setCheckoutOpen(false);
  //     closeCart();
  //   }
  // }, [checkoutOpen]);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {cartMessage} {}
          {cartItems.length > 0
            ? "You can modify your order here. And then proceed to checkout"
            : " "}
        </Offcanvas.Title>
      </Offcanvas.Header>
      {/* in order to have our added to cart items visible */}
      <Offcanvas.Body>
        <Stack gap={1}>
          {cartItems.map((item) => (
            <div className="added-to-cart-container" key={item.id}>
              <img
                src={item.image}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
                alt={item.type}
              ></img>
              <div className="me-auto">
                <div>
                  {/* <p data-tag="type"> */}
                  {item.type}{" "}
                  {item.quantity > 1 && (
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      x{item.quantity}
                    </span>
                  )}
                  <button
                    className="add-to-inside-cart"
                    onClick={() => increaseCartQuantity(item.id, products)}
                  >
                    +
                  </button>
                  <button
                    className="decrease-inside-cart"
                    onClick={() => decreaseCartQuantity(item.id, products)}
                  >
                    -
                  </button>
                </div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {item.price}&euro;
                </div>
                <div>
                  total: {item.price * item.quantity}&euro;
                  <button
                    className="remove-inside-cart"
                    onClick={() => removeFromCart(item.id, products)}
                  >
                    &times;
                  </button>
                </div>
                {/* </p> */}
                {/* <p data-tag="price">price: {item.price} Eur</p> */}
                {/* <p data-tag="quantity">{item.quantity} pcs</p> */}
                {/* <p data-tag="total">total: {item.price*item.quantity} Eur</p> */}
              </div>

              {/* other properties */}
            </div>
            // <CartItem key={item.id} {...item} product={product} />
          ))}
          {/* total sum here */}
          <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            Total sum: {totalSum}&euro;
          </div>

          {/* Checkout button */}
          <div>
            <button onClick={handleCheckout} className="checkout-shopping-cart">
              Checkout
            </button>
          </div>
        </Stack>
      </Offcanvas.Body>
      {/* <Foo/> */}
      {/* <Checkout/> */}

      {/* Checkout form */}

      {/* {checkoutOpen && 
            <Checkout
            handleCheckout={handleCheckout}/>} */}

      {/* Render Checkout component outside Offcanvas.Body */}
      {checkoutOpen && <Checkout handleCheckoutClose={handleCheckoutClose} />}

      {/* handleCheckout={() => { */}
      {/* setCheckoutOpen(false); //close checkout form */}
      {/* closeCart(); //close cart after checkout */}
      {/* }} */}
      {/* /> */}
      {/* } */}

      {/* // <ShoppingCart isOpen={false}/>     */}
      {/* }}  */}

      {/* <div>
            <button   onClick={() => handleCheckout(item.id, products) } className="checkout-shopping-cart">checkout</button>
          </div> */}
    </Offcanvas>
  );
}
