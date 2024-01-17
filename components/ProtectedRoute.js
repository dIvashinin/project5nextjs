import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const ProtectedRoute = ({children}) => {
const [user, setUser] = useState(null);
const router = useRouter();

useEffect(() => {
  const unsubscribe = onAuthStateChanged (auth, (user) =>{
    if (user) {
        setUser(user);
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
}
return <>{children}</>;
};

export default ProtectedRoute