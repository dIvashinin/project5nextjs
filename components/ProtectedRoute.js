import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseConfig';

// const SHOP_OWNER_UID=process.env.USER_UID;
// appId: process.env.NEXT_PUBLIC_APP_ID,
const SHOP_OWNER_UID ='VRsq623ztSPYtY0xr7quFv8Heyx2';
// console.log('SHOP_OWNER_UID :>> ', SHOP_OWNER_UID);

const ProtectedRoute = ({children}) => {
const [user, setUser] = useState(null);
const router = useRouter();
// console.log('user :>> ', user);
// console.log('user.uid :>> ', user.uid);
useEffect(() => {
  const unsubscribe = onAuthStateChanged (auth, (user) =>{
    if (user && user.uid === SHOP_OWNER_UID) {
        setUser(user);
        // console.log('hi shop owner! welcome!');
        // Redirect to the dashboard when the correct user is logged in
        router.replace('/dashboard');
        
    } else {
        // redirect (in login case 'replace', because we replace the prev link and can't go back)
        router.replace('/login');
    }
    return () => unsubscribe();
    }, []);
    
    if (!user) {
        //here loading spinner later
        return null;
    }
});
  
return <>{children}</>;
};

export default ProtectedRoute;