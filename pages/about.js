import React from "react";
import { useFilteredProducts } from "../context/FilteredProductsContext";
import { useRedirectOnCondition } from "../hooks/useRedirectOnCondition";
const shopBanner = 
// "https://res.cloudinary.com/dzghua4dz/image/upload/v1701986735/moonrubyshop/cgfdekd8afqoxuygrrgb.jpg"
"https://res.cloudinary.com/dzghua4dz/image/upload/v1711134633/moonrubyshop/xqkxmaljehv9a8ecxn0t.jpg";

function About() {

  const {filteredProducts , setFilteredProducts} = useFilteredProducts();

  useRedirectOnCondition(filteredProducts.length > 0, '/');
  console.log('filteredProducts in about :>> ', filteredProducts);

  return (
    <div >
        <h3 data-tag="top-about-empty-space"></h3>
        <div className="banner-container-about">
        <img src={shopBanner} alt="Etsy" className="banner-image" />
        <h3 data-tag="title">Jewelry winning over anxiety</h3>
      
      </div>
      <h6 data-tag="title">
        <span className="handmade">Handmade </span> 
        <span className="anti-anxiety">anti-anxiety </span> 
        <span className="jewelry">jewelry </span> 
        <span className="made-in">made in Berlin </span> 
        <span className="from-natural">from natural stones </span> 
        <span className="noble-metals">and noble metals</span>
      </h6>
      {/* <h2 className="moon-ruby-shop">Moon Ruby Shop</h2> */}
      <div className="about-main-container">
        
      {/* <h2 data-tag="about">About this shop</h2> */}
        {/* <h3 data-tag="title">Jewelry winning over anxiety</h3>
      <h6 data-tag="title">
        <span className="handmade">Handmade </span> 
        <span className="anti-anxiety">anti-anxiety </span> 
        <span className="jewelry">jewelry </span> 
        <span className="made-in">made in Berlin </span> 
        <span className="from-natural">from natural stones </span> 
        <span className="noble-metals">and noble metals</span>
      </h6> */}
      <p>
        Hi! I&apos;ve been living with anxiety for quite a long time, but founding my
        new passion in jewelry making helped me so much ever since. Working with
        the natural stones, hearing them clacking, seeing the light playing
        through them on my skin and doing some breathing exercises while I am at
        it - I found it super soothing. </p>
        
        <p>I wear my jewelry 24/7 and noticed, that
        fidgeting and playing with it really helps me against anxiety symptoms
        and raises my concentration. I hope you&apos;ll feel the same and will love
        your new pieces! I came up with my first anti-anxiety fidget ring back
        in 2019 and since then I am constantly trying to invent and create new
        designs - that are helpful and cute! </p> 
        
        <p>As my craftsmanship grows, I&apos;m
        becoming able to create more elaborate jewelry types, but the idea
        behind this is always the same - helping people with anxiety (like
        myself) to feel better through playful and pretty jewelry designs. Oh,
        and I named the store in honour of my cat Ruby (RIP my beautiful fur
        baby) xx Love, Oksana
      </p>
      {/* <p>
        P.S. Pls follow the shop on Insta
        https://www.instagram.com/moonrubyshop/
      </p> */}

      <p>
        Why do I call my jewelry anti-anxiety? 😌 All the jewellery is perfect
        for fidgeting, especially the rings. I found that playing with the stone
        beads helps me to concentrate and relax, especially in stressful
        situations. I love how gems are changing their temperature, how they
        clack, how the light breaks in them, how unique each one of them looks.
      </p>

      <p>
        💆🏻‍♀️ I choose natural gemstones known by their anti-anxiety properties:
        like amethyst, rose quartz, aventurine etc. I believe that everything
        coming from nature has a little bit of magic in it and is able so store
        vibes and energy.
      </p>

      <p data-tag="last-p">
        🤗 Speaking of vibes, making jewelry helps me a lot as well. It&apos;s a bit
        like meditation, helps me to look inwards and to feel calmer generally.
        So I make my pieces with very positive energy, trying to keep the
        process stress free.
      </p>
      </div>
    </div>
  );
}

export default About;
