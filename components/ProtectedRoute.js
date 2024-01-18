import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseConfig';

const SHOP_OWNER_UID = process.env.USER_UID;

const ProtectedRoute = ({children}) => {
const [user, setUser] = useState(null);
const router = useRouter();

useEffect(() => {
  const unsubscribe = onAuthStateChanged (auth, (user) =>{
    if (user && user.uid === SHOP_OWNER_UID) {
        setUser(user);
        
    } else {
        // redirect (in login case 'replace', because we replace the prev link and can't go back)
        router.replace('/login');
    }
});
router.replace('/dashboard');
return () => unsubscribe();
}, [router]);

if (!user) {
    //here loading spinner later
    return null;
}
return <>{children}</>;
};

export default ProtectedRoute