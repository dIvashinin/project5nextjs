import Head from 'next/head';
import '../styles/globals.css';
import '../styles/Home.module.css';
import '../styles/styles.css'
import NavBar from '../components/NavBar';
//don't know why but shoppingCartContext needed to start with small letter so i changed the name of the file as well
import {ShoppingCartProvider} from '../context/shoppingCartContext';


function MyApp({ Component, pageProps }) {
  //here we console.log our 'app', 'db' variable when checking if any env variables are ok
  
  
  return (
    <div>
  <Head>
        <title>project5nextjs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Wrap the entire application with the ShoppingCartProvider */}
      <ShoppingCartProvider>
    {/* <p>this one should appear everywhere</p> */}
    <NavBar/>
  <Component {...pageProps} />
  </ShoppingCartProvider>
  </div>
  );
}

export default MyApp
