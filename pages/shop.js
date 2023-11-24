import React from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebaseConfig';

function Shop() {

    const getProducts = async () => {
const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
  
});
}
  return (
    <div>
    <h2>shop</h2>
    </div>
  );
}

export default Shop;