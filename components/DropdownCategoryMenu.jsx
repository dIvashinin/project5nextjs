import { Offcanvas, Stack } from "react-bootstrap";
import React, { useEffect, useState } from 'react'
import { useShoppingCart } from "../context/ShoppingCartContext";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from './ProductCard';
import { useProduct } from "../context/productContext";

function DropdownCategoryMenu({isOpen2}) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
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
    // console.log('categories :>> ', categories);
    const products = useProduct();
    console.log('products :>> ', products);

    const handleCategoryClick = (category) => {
        setSelectedCategory (category);
        console.log('category :>> ', category);
        closeDropdownCategory();
        // Filter the products based on the selected category
        const filteredProducts = products.filter((product) =>
            
            product.type === category
            );
            setFilteredProducts(filteredProducts);
        };

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
    if (!products) {
        return <p></p>; // or handle the case where product is not available
      }
    
  return (
    <div>

    <Offcanvas className="offcanvas-itself" show={isOpen2} onHide={closeDropdownCategory} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <h2>Hey you! Look what we have:</h2>
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
              <div className="category-unique-dropdown" 
              key={category}
              onClick={() => handleCategoryClick(category)}
              >{category}</div>
            ))}
        </Stack>
      </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default DropdownCategoryMenu