import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";

function SingleProductCard({ product }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    //useState is asynchronous, and the state might not have 
    //been updated yet at the time of logging.
    //we need to useEffect
    // console.log('selectedColor :>> ', selectedColor);
  };
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    // console.log('selectedSize :>> ', selectedSize);
  };
  // Use useEffect to log the updated values
useEffect(() => {
  console.log('selectedColor :>> ', selectedColor);
  console.log('selectedSize :>> ', selectedSize);
}, [selectedColor, selectedSize]);

  const router = useRouter();

  const goBack = "https://res.cloudinary.com/dzghua4dz/image/upload/v1702383208/moonrubyshop/aprr0iiz9cofqotmk7gp.svg"

  // Check if product is defined
  if (!product) {
    return <p>Loading...</p>; // or handle the case where product is not available
  }

  const quantity = getItemQuantity(product.id);
  // State to manage the visibility of the FAQ section
  const [showFAQ, setShowFAQ] = useState(true);

  return (
    <div className="outer-container-for-single-product">
    <div className="single-product-card">
    {/* <img src={goBack} alt="go back"/> */}
      <div className="goback-icon">
      <Link href='/shop'>
        <a>
        <img src={goBack} alt="go back"/>
        </a>
         </Link>
         </div>
      <Link href={`/product/${product.id}`}>
        <a>
          <img src={product.image} alt={product.type} />
        </a>
      </Link>
      <h5 >{product.type}</h5>
      <p >{product.description}</p>
      <p >price: {product.price}&euro;</p>

      {/* Additional options for the single product page */}
      <div>
        <label>
          Color option:
          <select 
          onChange={handleColorChange}
          >
            {/* Add color options based on your data */}
            <option value="option 1">option 1</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
            <option value="option 4">option 4</option>
            <option value="option 5">option 5</option>
            <option value="option 6">option 6</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Size:
          <select onChange={handleSizeChange}>
            {/* Add size options based on your data */}
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </select>
        </label>
      </div>

      {/* - also an option to leave comment to the order 
    - an option to send a message to shop owner
*/}
      <div>
        <button
          className="add-to-cart-button"
          onClick={() => increaseCartQuantity(product.id, product,selectedColor, selectedSize)}
        >
          + add to cart
        </button>
        <button
          className="minus-to-cart-button"
          onClick={() => decreaseCartQuantity(product.id, product, selectedColor, selectedSize)}
        >
          - remove
        </button>
      </div>

      {/* Display additional images */}
      {product.additionalImages && (
        <div>
          {product.additionalImages.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index + 2}`} />
          ))}
        </div>
      )}

      {/* Additional product information */}
      <div>
        <h2>Shop Policies</h2>
        <p>Delivery information: ...</p>
        <p>Return policy: ...</p>
        <div>
          {/* FAQ section */}
          <h2>Frequently asked questions</h2>
          <ul>
            {showFAQ ? (
              <>
               {/* Show less button */}
               <button onClick={() => setShowFAQ(false)}>Show more</button>
              </>
            ) : (
              // Render a limited number of FAQ items
              <>
                <li>
                  <h4>Custom and personalised orders and returns</h4>
                  <p>
                    I love our little collaborations! Don't hesitate to contact
                    me with your ideas. But please please please try to avoid
                    requesting mass market replicas or copies of someone else's
                    work! Since the standard worldwide delivery is free, if you
                    want to return your item, that is not damaged, you are the
                    one to cover the shipping. I don't offer covering shipping
                    expenses in this case. I recommend choosing the most simple
                    option available in your country, no tracking and insurance
                    need (for Germany BUEWA or 1 euro letter works best). For
                    damaged item please see the info below.
                  </p>
                </li>

                 {/* Show less button
                 <button onClick={() => setShowFAQ(false)}>Show less</button>
               </>
             ) : (
               Render a limited number of FAQ items
              <> */}
                <li>
                  <h4>Are the stones you use real?</h4>
                  <p>
                    Yes! Most of them are natural, otherwise it says so. For
                    example some of the beads can be synthetically produced
                    stones. But all of them are unique, cold to touch and pretty
                    (I make sure of that). All the stones have their character
                    too, most of the colors are not homogenous. E.g. it's normal
                    for lapis lazuli to have white parts - it's calcit working
                    it's magic in the mineral. Apatite can also have white
                    and/or brown spots and so on. All of these are signs of
                    their natural origin and uniqueness, not flaws. The crystals
                    in my anti-anxiety faceted gem rings are always natural.
                  </p>
                </li>

                <li>
                  <h4>Why do you call your jewelry anti-anxiety?</h4>
                  <p>
                    All of it is perfect for fidgeting, especially the rings and
                    bracelets. I found that playing with the stone beads helps
                    me to concentrate and relax, especially in stressful
                    situations. I love how gems are changing their temperature,
                    how they clack, how the light breaks in them, how unique
                    each one of them looks. I choose natural gemstones known by
                    their anti-anxiety properties: like amethyst, rose quartz,
                    aventurine etc. I believe that everything coming from nature
                    has a little bit of magic in it and is able so store vibes
                    and energy.
                  </p>
                </li>

                <li>
                  <h4>Sizing details</h4>
                  <p>
                    The best way to measure your fingers for the rings is to use
                    piece of thread. Wrap it around your finger and then measure
                    where the ends meet. This method can be used for bracelets
                    and necklaces too. I can always help you with sizing. Please
                    don't forget to consult the description of an item for it's
                    size.
                  </p>
                </li>
                <li>
                  <h4>I haven't received my order.</h4>
                  <p>
                    Sorry you have to wait so long! Please do get in touch with
                    me and we will figure something out. Don't forget to check
                    the average delivery time for your location in shop info.
                  </p>
                </li>
                <li>
                  <h4>My order came in broken.</h4>
                  <p>
                    Oh no! Please contact me for replacement. I pack everything
                    as securely as possible in bubble wrap (I mostly re-use it
                    to avoid new plastic), but sometimes stones can break during
                    shipping. Don't hesitate to reach out! If the item was
                    broken within a month after the purchase I can also offer a
                    free replacement. Please kindly describe what has happened
                    to it and include pictures. No need to send the item back.
                  </p>
                </li>
                <li>
                  <h4>Care instructions - Stones</h4>
                  <p>
                    Here are some care instructions. All the pieces are sturdy
                    and securely made and with right care they can last so long!
                    - Please avoid hitting stones against hard surfaces, some
                    gems can be brittle and chip, this can affect durability and
                    comfort. - You can get the pieces wet, but please avoid
                    chemicals and frequent exposure to soaps, especially when
                    there's a metal element present. Silver will tarnish in
                    time, but can easily be cleaned. - Please avoid heat and
                    open fire. It's better to take the jewelry off when cooking.
                  </p>
                </li>
                <li>
                  <h4>Care Instructions - Elastics</h4>
                  <p>
                    Elastic thread that I use is a tiny miracle. It's so comfy
                    to wear and easy to work with - but as with any elastics
                    with really active wear it can stretch out. But no worries,
                    it's really easy to avoid this. - Please avoid unnecessary
                    stretching - the pieces are meant to be played with but
                    excessive pulling will thin the tread out. - Make sure you
                    choose the right size of the piece. If it fits right, it's
                    less likely to stretch. - It's helpful to leave your jewelry
                    to lay around for couple days, so the thread can relieve the
                    stress and come back to it's normal state (works for me too
                    haha). Let the physics do it's work.
                  </p>

                  <p>
                    And a general tip - make sure not to put the pieces in the
                    washing machine... I know, happens to the best of us...
                  </p>
                </li>
                <li>
                  <h4>Important! Children Safety 👼</h4>
                  <p>
                    The jewellery is designed for adults. However I can make any
                    design in children’s sizes. The parent/buyer then is the one
                    to decide whether the jewellery is suitable and appropriate
                    for the child. The shop doesn’t carry any responsibility in
                    case when the jewellery is damaged or/and afflicts any
                    injury while in use by a child. Please be aware of small
                    parts and/or breakable parts. Please use common sense and
                    use only as intended.
                  </p>
                </li>
                <li>
                  <h4>Important! Metal Allergy!</h4>
                  <p>
                    The crimp beads I use in almost all the jewelry are made of
                    safe non-ferrous non-precious metal. They are totally fine
                    for everyday wear as well for contact with water (some of my
                    bracelets I have worn for years now). However, if you have a
                    metal allergy (develop a rush or skin colouring while in
                    contact with non-precious metals) you can ask me to replace
                    the crimping bead to hippoallergenic sterling silver one.
                    Just drop me a message if you are unsure!
                  </p>
                </li>

                {/* ... Render other limited FAQ items ... */}

                {/* Show more button */}
                <button onClick={() => setShowFAQ(true)}>Show less</button>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="goback-icon">
      <Link href='/shop'>
        <a>
        <img src={goBack} alt="go back"/>
        </a>
         </Link>
         </div>
    </div>
    </div>
  );
}

export default SingleProductCard;
