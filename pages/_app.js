import Head from "next/head";
import "../styles/globals.css";
import "../styles/Home.module.css";
import "../styles/styles.css";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
//don't know why but shoppingCartContext needed to start with small letter so i changed the name of the file as well
import { ShoppingCartProvider } from "../context/ShoppingCartContext";
import { ProductProvider } from "../context/productContext";
import { CheckoutProvider } from "../context/checkoutContext";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, products }) {
  //here we console.log our 'app', 'db' variable when checking if any env variables are ok
  // console.log('products myApp :>> ', products);
  // console.log('pageProps :>> ', pageProps.products);
  // console.log('Component :>> ', Component);

  return (
    <div>
      <Head>
        <title>MoonRubyShop</title>
        <meta
          name="description"
          content="Handmade anti-anxiety jewelry made in Berlin from natural stones and noble metals"
        />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      </Head>
      {/* first productProvider */}
      <ProductProvider products={pageProps.products}>
        {/* then ShoppingCartProvider */}
        <CheckoutProvider>
          {/* the order is important to have right things available in right place */}
          <ShoppingCartProvider>
            {/* <p>this p tag should appear everywhere</p> */}
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </ShoppingCartProvider>
        </CheckoutProvider>
      </ProductProvider>
    </div>
  );
}
export default MyApp;
