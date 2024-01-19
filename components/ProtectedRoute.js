import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseConfig';

//important! Next.js environment variables with the NEXT_PUBLIC_ prefix 
//are accessible in the browser at runtime. So, if you want to use 
//an environment variable in the browser (client-side), 
//make sure it's prefixed with NEXT_PUBLIC_
const SHOP_OWNER_UID=process.env.NEXT_PUBLIC_USER_UID;

// const SHOP_OWNER_UID ='VRsq623ztSPYtY0xr7quFv8Heyx2';
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
});
return () => unsubscribe();
}, [router]);

if (!user) {
    //here loading spinner later
    return null;
    //i was returning null here and it was complaining about it
    // so i change to 'nothing'
    // return;
}
  
return <>{children}</>;
};

export default ProtectedRoute;