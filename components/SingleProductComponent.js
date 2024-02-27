import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useRouter } from "next/router";
import ProtectedRoute from "./ProtectedRoute";
import Alert from "react-bootstrap/Alert";

function SingleProductCard({ product }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  //adding EDIT state here
  // const [editing, setEditing] = useState(false);
  //i reuse state variables from dashboard (type, price, descr, image etc.)
  const [type, setType] = useState("ring");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  //this one is file itself
  const [imageFile, setImageFile] = useState("");
  //this one is URL of the file
  const [image, setImage] = useState("");

  //We initialize a state variable showEditForm to false, indicating that the edit form should be hidden initially.
  const [showEditForm, setShowEditForm] = useState(false);

  //pls select smth is going to be by default
  const [selectedColor, setSelectedColor] = useState("option 1");
  const [selectedSize, setSelectedSize] = useState("small");
  
  const [showAlert1, setShowAlert1] = useState(false); // State to manage the alert
  const [showAlert2, setShowAlert2] = useState(false); // State to manage the alert

  //reuse from dashboard
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // i put edit form under protected route, so no need in this
  // function to handle editing
  // const handleEdit = () => {
  //   setEditing(true);
  //   console.log('editing now true');
  // }

  //We define a function handleEditToggle that toggles the value of showEditForm between true and false when called.
  const handleEditToggle = () => {
    setShowEditForm(!showEditForm);
  };

  // Function to handle form submission for editing
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("editing form");
    // You can navigate to the edit page or display an edit form directly in this component
    try {
      let updatedImage = image; // Assume image URL remains the same by default

      if (imageFile) {
        const cloudinaryCloudName =
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "my-moonrubyshop-2");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }

        const imageData = await response.json();
        updatedImage = imageData.secure_url;
      }

      // Step 2: Submit form data to backend
      const productResponse = await fetch(`/api/${product.id}`, {
        method: "PUT", // Use PUT method for updating
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //without any state check, here we need to add everything
          // type,
          // price,
          // description,
          // image: updatedImage,
          // The type, price, and description fields are set to their new values only if their
          //corresponding state variables are not empty (!== "").
          //This ensures that only modified values are included in the request body.
          // Include updated type only if it has been modified
          type: type !== "" ? type : product.type,
          // Include updated price only if it has been modified
          price: price !== "" ? price : product.price,
          // Include updated description only if it has been modified
          description: description !== "" ? description : product.description,
          // Include updated image URL only if it has been modified
          image: imageFile ? updatedImage : product.image,
        }),
      });
      console.log("successfully updated");
      setShowAlert1(true);
      if (!productResponse.ok) {
        throw new Error("Failed to update product");
      }
      
    } catch (error) {
      console.error("Error editing product:", error);
      setShowAlert1(false);
      // Handle error
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch (`/api/${product.id}`,{
      method: 'DELETE',
    });
    console.log('deleted!!');
    setShowAlert2(true);

    if (!response.ok) {
      throw new Error('failed to delete product');
      
    }

    //in case this product is in shopping cart, delete it
    removeFromCart(product.id);
    
    } catch (error) {
      console.error('Error deleting product:', error);
      setShowAlert2(false);
    }
  };

  //i simplified my code by simply putting edit form under protected route
  //so no need in condition check which caused issues!!

  // If editing mode is enabled, render an edit form
  //it's a common approach for conditionally rendering different parts of a component based on its state
  // if (editing) {
  //   return (
  //     <div>
  //       {/* Render an edit form here */}

  //     <form className="product-form" onSubmit={handleFormSubmit}>
  //           <label> Type
  //             <select
  //             onChange={handleTypeChange}
  //             >
  //               <option value="ring">ring</option>
  //               <option value="earring">earring</option>
  //               <option value="bracelet">bracelet</option>
  //               <option value="necklace">necklace</option>
  //               <option value="option 5">option 5</option>
  //               <option value="option 6">option 6</option>
  //             </select>
  //           </label>

  //           <input
  //             type="text"
  //             value={price}
  //             onChange={handlePriceChange}
  //             placeholder="Price"
  //           />
  //           <textarea
  //             value={description}
  //             onChange={handleDescriptionChange}
  //             placeholder="Description"
  //           />
  //           <input type="file"
  //           onChange={handleImageChange}
  //            />
  //           {/* Additional fields if needed */}
  //           {/* Submit button */}
  //           <button type="submit">Submit changes</button>
  //         </form>
  //     </div>
  //   );
  // }

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    // console.log('e.target.value :>> ', e.target.value);
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
    console.log("selectedColor :>> ", selectedColor);
    console.log("selectedSize :>> ", selectedSize);
  }, [selectedColor, selectedSize]);

  // const router = useRouter();

  const goBack =
    "https://res.cloudinary.com/dzghua4dz/image/upload/v1702383208/moonrubyshop/aprr0iiz9cofqotmk7gp.svg";

  // Check if product is defined
  if (!product) {
    return <p></p>; // or handle the case where product is not available
  }

  const quantity = getItemQuantity(product.id);
  // State to manage the visibility of the FAQ section
  const [showFAQ, setShowFAQ] = useState(true);
  console.log('product :>> ', product);

  return (
    <div className="outer-container-for-single-product">
      <div className="single-product-card">
        {/* <img src={goBack} alt="go back"/> */}
        <div className="goback-icon">
          <Link href="/shop">
            <a>
              <img src={goBack} alt="go back" />
            </a>
          </Link>
        </div>


        {/* here goes a new part of rendering 6 images */}
        <div className="row">
          <div className="col-md-6">
            <Link href={`/product/${product.id}`}>
              <a>
                <img src={product.image[5]} alt={product.type} className="main-image" />
              </a>
            </Link>
          </div>
          <div className="col-md-6">
            <div className="row">
              {product.image.slice(0, 5).map((imageUrl, index) => (
                <div className="col-md-4" key={index}>
                  <img src={imageUrl} alt={product.type} className="gallery-image" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <h5>{product.type}</h5>
        <p>{product.description}</p>
        <p>Price: {product.price}&euro;</p>
      {/* </div> */}
    {/* </div> */}



{/* this on was old only for one image */}
         {/* <Link href={`/product/${product.id}`}> */}
           {/* <a> */}
             {/* so when i changed how i treat 'image' inside [productId] - 
             as an array, product now contains 'image' field as an array of urls!
             */}
             {/* <img src={product.image[5]} alt={product.type} /> */}
           {/* </a> */}
         {/* </Link> */}
         {/* <h5>{product.type}</h5> */}
        {/* <p>{product.description}</p> */}
         {/* <p>price: {product.price}&euro;</p> */}

        {/* Additional options for the single product page */}
        <div>
          <label>
            Color option:
            <select onChange={handleColorChange} value={selectedColor}>
              {/* disabled value doesn't count as value! */}
              {/* <option disabled value="pls select color">pls select color</option> */}
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
            <select onChange={handleSizeChange} value={selectedSize}>
              {/* <option disabled value="pls select size">pls select size</option> */}
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
            onClick={() =>
              increaseCartQuantity(
                product.id,
                product,
                selectedColor,
                selectedSize
              )
            }
            // disabled={!selectedColor || !selectedSize}
            // disabled={selectedColor === "pls select color" || selectedSize === "pls select size"}
          >
            + add to cart
          </button>
          {/* <ProtectedRoute>
        <button onClick={handleEdit}>edit</button>
        <button>delete</button>
      </ProtectedRoute> */}
          {/* <button
          className="minus-to-cart-button"
          onClick={() => decreaseCartQuantity(product.id, product, selectedColor, selectedSize)}
        >
          - remove
        </button> */}
        </div>
        <ProtectedRoute>

        <Alert
            variant="success" 
            show={showAlert1}
            onClose={() => setShowAlert1(false)}
            dismissible
          >
            Congrats! Product edited successfully!
          </Alert>

          <Alert
            variant="success" 
            show={showAlert2}
            onClose={() => setShowAlert2(false)}
            dismissible
          >
            Congrats! Product deleted successfully!
          </Alert>

          <div className="edit-listing">
            {/* We apply handleEditToggle as an onClick event handler to the "Edit listing" header (<h4> element) */}
            <h4 onClick={handleEditToggle} style={{ cursor: "pointer" }}>
              Edit listing
            </h4>
            {/* Render an edit form here */}
            {/* We conditionally render the edit form (<form>) based on the value of showEditForm. It will only be rendered if showEditForm is true. */}
            {showEditForm && (
              <form className="product-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="type">Type: </label>
                  <select id="type" onChange={handleTypeChange}>
                    <option value="ring">ring</option>
                    <option value="earring">earring</option>
                    <option value="bracelet">bracelet</option>
                    <option value="necklace">necklace</option>
                    <option value="option 5">option 5</option>
                    <option value="option 6">option 6</option>
                  </select>
                  {/* </label> */}
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price: </label>
                  <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="Price"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <input id="image" type="file" onChange={handleImageChange} />
                </div>
                {/* Additional fields if needed */}
                {/* Submit button */}
                <button type="submit">Submit changes</button>
                <button onClick={handleDelete}>Delete listing</button>
              </form>
            )}
          </div>
        </ProtectedRoute>

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
                      I love our little collaborations! Don't hesitate to
                      contact me with your ideas. But please please please try
                      to avoid requesting mass market replicas or copies of
                      someone else's work! Since the standard worldwide delivery
                      is free, if you want to return your item, that is not
                      damaged, you are the one to cover the shipping. I don't
                      offer covering shipping expenses in this case. I recommend
                      choosing the most simple option available in your country,
                      no tracking and insurance need (for Germany BUEWA or 1
                      euro letter works best). For damaged item please see the
                      info below.
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
                      stones. But all of them are unique, cold to touch and
                      pretty (I make sure of that). All the stones have their
                      character too, most of the colors are not homogenous. E.g.
                      it's normal for lapis lazuli to have white parts - it's
                      calcit working it's magic in the mineral. Apatite can also
                      have white and/or brown spots and so on. All of these are
                      signs of their natural origin and uniqueness, not flaws.
                      The crystals in my anti-anxiety faceted gem rings are
                      always natural.
                    </p>
                  </li>

                  <li>
                    <h4>Why do you call your jewelry anti-anxiety?</h4>
                    <p>
                      All of it is perfect for fidgeting, especially the rings
                      and bracelets. I found that playing with the stone beads
                      helps me to concentrate and relax, especially in stressful
                      situations. I love how gems are changing their
                      temperature, how they clack, how the light breaks in them,
                      how unique each one of them looks. I choose natural
                      gemstones known by their anti-anxiety properties: like
                      amethyst, rose quartz, aventurine etc. I believe that
                      everything coming from nature has a little bit of magic in
                      it and is able so store vibes and energy.
                    </p>
                  </li>

                  <li>
                    <h4>Sizing details</h4>
                    <p>
                      The best way to measure your fingers for the rings is to
                      use piece of thread. Wrap it around your finger and then
                      measure where the ends meet. This method can be used for
                      bracelets and necklaces too. I can always help you with
                      sizing. Please don't forget to consult the description of
                      an item for it's size.
                    </p>
                  </li>
                  <li>
                    <h4>I haven't received my order.</h4>
                    <p>
                      Sorry you have to wait so long! Please do get in touch
                      with me and we will figure something out. Don't forget to
                      check the average delivery time for your location in shop
                      info.
                    </p>
                  </li>
                  <li>
                    <h4>My order came in broken.</h4>
                    <p>
                      Oh no! Please contact me for replacement. I pack
                      everything as securely as possible in bubble wrap (I
                      mostly re-use it to avoid new plastic), but sometimes
                      stones can break during shipping. Don't hesitate to reach
                      out! If the item was broken within a month after the
                      purchase I can also offer a free replacement. Please
                      kindly describe what has happened to it and include
                      pictures. No need to send the item back.
                    </p>
                  </li>
                  <li>
                    <h4>Care instructions - Stones</h4>
                    <p>
                      Here are some care instructions. All the pieces are sturdy
                      and securely made and with right care they can last so
                      long! - Please avoid hitting stones against hard surfaces,
                      some gems can be brittle and chip, this can affect
                      durability and comfort. - You can get the pieces wet, but
                      please avoid chemicals and frequent exposure to soaps,
                      especially when there's a metal element present. Silver
                      will tarnish in time, but can easily be cleaned. - Please
                      avoid heat and open fire. It's better to take the jewelry
                      off when cooking.
                    </p>
                  </li>
                  <li>
                    <h4>Care Instructions - Elastics</h4>
                    <p>
                      Elastic thread that I use is a tiny miracle. It's so comfy
                      to wear and easy to work with - but as with any elastics
                      with really active wear it can stretch out. But no
                      worries, it's really easy to avoid this. - Please avoid
                      unnecessary stretching - the pieces are meant to be played
                      with but excessive pulling will thin the tread out. - Make
                      sure you choose the right size of the piece. If it fits
                      right, it's less likely to stretch. - It's helpful to
                      leave your jewelry to lay around for couple days, so the
                      thread can relieve the stress and come back to it's normal
                      state (works for me too haha). Let the physics do it's
                      work.
                    </p>

                    <p>
                      And a general tip - make sure not to put the pieces in the
                      washing machine... I know, happens to the best of us...
                    </p>
                  </li>
                  <li>
                    <h4>Important! Children Safety 👼</h4>
                    <p>
                      The jewellery is designed for adults. However I can make
                      any design in children’s sizes. The parent/buyer then is
                      the one to decide whether the jewellery is suitable and
                      appropriate for the child. The shop doesn’t carry any
                      responsibility in case when the jewellery is damaged
                      or/and afflicts any injury while in use by a child. Please
                      be aware of small parts and/or breakable parts. Please use
                      common sense and use only as intended.
                    </p>
                  </li>
                  <li>
                    <h4>Important! Metal Allergy!</h4>
                    <p>
                      The crimp beads I use in almost all the jewelry are made
                      of safe non-ferrous non-precious metal. They are totally
                      fine for everyday wear as well for contact with water
                      (some of my bracelets I have worn for years now). However,
                      if you have a metal allergy (develop a rush or skin
                      colouring while in contact with non-precious metals) you
                      can ask me to replace the crimping bead to hippoallergenic
                      sterling silver one. Just drop me a message if you are
                      unsure!
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
          <Link href="/shop">
            <a>
              <img src={goBack} alt="go back" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleProductCard;
