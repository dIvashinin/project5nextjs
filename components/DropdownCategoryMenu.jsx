import { Offcanvas, Stack } from "react-bootstrap";
import React from 'react'
import { useState } from "react";

function DropdownCategoryMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const openDropdownCategory = () => setIsOpen(true);
    const closeDropdownCategory = () => setIsOpen(false);

  return (
    <div>
        
    <Offcanvas show={isOpen} onHide={closeDropdownCategory} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
            <p>Choose</p>
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