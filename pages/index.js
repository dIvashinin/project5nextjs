import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import styles from '../styles/styles.css'

// import { Inter } from "next/font/google";

// const inter = Inter(); 

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Head: it's an importnt adavantage to add SEO etc 
      Title tag, meta tag, open graph tag, robot tags etc.
      */}
      <Head>
        <title>project5</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Still work in progress</h1>
        <p>more content soon</p>

             </main>

      
    </div>
  )
}
