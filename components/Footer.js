import Link from "next/link";
import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEtsy, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';

const etsyIcon =
  "https://res.cloudinary.com/dzghua4dz/image/upload/v1701980006/moonrubyshop/h8z81huv3zccge5a5gks.svg";
const instagramIcon =
  "https://res.cloudinary.com/dzghua4dz/image/upload/v1701979993/moonrubyshop/waqgyccu5yktbke9tm6a.svg";
const FAQ =
  "https://res.cloudinary.com/dzghua4dz/image/upload/v1702062726/moonrubyshop/iaiimnkwoj5kuzckba0v.svg";

function Footer() {
  return (
    <div className="footer-container">
      <Link href="https://www.etsy.com/shop/MoonRubyShop" passHref>
        <a target="_blank" rel="noopener noreferrer">
          <img
            src={etsyIcon}
            alt="Etsy"
            style={{ width: "30px", height: "30px" }}
          />
          {/* <FontAwesomeIcon icon={faEtsy} size="2x" /> */}
        </a>
      </Link>
      <Link href="https://www.instagram.com/moonrubyshop/" passHref>
        <a target="_blank" rel="noopener noreferrer">
          <img
            src={instagramIcon}
            alt="Instagram"
            style={{ width: "30px", height: "30px" }}
          />
          {/* <FontAwesomeIcon icon={faInstagram} size="2x" /> */}
        </a>
      </Link>
      <Link href="/faq"
        // href="#"
        // href="/about#last-p"
        // passHref
      >
        <a 
        // target="_blank"
        //  rel="noopener noreferrer"
         >
          <img src={FAQ} alt="FAQ" style={{ width: "30px", height: "30px" }} />
        </a>
      </Link>
    </div>
  );
}

export default Footer;
