import { Offcanvas, Stack } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useShoppingCart } from "../context/ShoppingCartContext";
import { db } from "../config/firebaseConfig";

function DropdownCategoryMenu({isOpen2}) {
    // const [isOpen2, setIsOpen2] = useState(false);
    // const openDropdownCategory = () => setIsOpen2(true);
    // const closeDropdownCategory = () => setIsOpen2(false);
    // console.log('isOpen2 :>> ', isOpen2);
    
    const {
            openDropdownCategory,
            closeDropdownCategory,
        } = useShoppingCart();
    // trying to retrieve all the types/categories i have
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      first
    
        const fetchCategories = async () => {
            try {
                const querySnapshot = await db.collection('products2').get();
                const uniqueCategories = new Set();
                querySnapshot.forEach((doc) => {
                    const productData = doc.data();
                    uniqueCategories.add(productData.type);
                });
                setCategories(Array.from(uniqueCategories));
            } catch (error) {
                console.error('error fetching categories:', error);  
            }
        };
        fetchCategories(); 
    }, [])
    



  return (
    <div>

    <Offcanvas show={isOpen2} onHide={closeDropdownCategory} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <p>Look what we have:</p>
          {/* {cartMessage} {}
          {cartItems.length > 0
            ? "You can modify your order here. And then proceed to checkout"
            : " "} */}
        </Offcanvas.Title>
      </Offcanvas.Header>
      {/* in order to have our added to cart items visible */}
      <Offcanvas.Body>
        <Stack gap={1}>
        </Stack>
      </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default DropdownCategoryMenu