import { Offcanvas, Stack } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useShoppingCart } from "../context/ShoppingCartContext";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
    
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products2'));
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
            <h2>Look what we have:</h2>
          {/* {cartMessage} {}
          {cartItems.length > 0
            ? "You can modify your order here. And then proceed to checkout"
            : " "} */}
        </Offcanvas.Title>
      </Offcanvas.Header>
      {/* in order to have our added to cart items visible */}
      <Offcanvas.Body>
        <Stack gap={1}>
        {categories.map((category) => (
              <div className="category-unique-dropdown" key={category}>{category}</div>
            ))}
        </Stack>
      </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default DropdownCategoryMenu