import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebaseConfig';

//important! Next.js environment variables with the NEXT_PUBLIC_ prefix 
//are accessible in the browser at runtime. So, if you want to use 
//an environment variable in the browser (client-side), 
//make sure it's prefixed with NEXT_PUBLIC_
const SHOP_OWNER_UID=process.env.NEXT_PUBLIC_USER_UID;

const ProtectedRoute = ({children}) => {
const [user, setUser] = useState(null);
const router = useRouter();

// useEffect(() => {
//   const unsubscribe = onAuthStateChanged (auth, (user) =>{
//     if (user && user.uid === SHOP_OWNER_UID) {
//         setUser(user);
//         // console.log('hi shop owner! welcome!');
//         // Redirect to the dashboard when the correct user is logged in
//         router.replace('/dashboard');
        
//     } if (!user) {
//         // redirect (in login case 'replace', because we replace the prev link and can't go back)
//         router.replace('/login');
//     }
// });
// if (!user) {
//     console.log('restricted area');
//     //here loading spinner later
//     return;
//     //i was returning null here and it was complaining about it
//     // so i change to 'nothing'
//     // return;
// }
// return () => unsubscribe();
// }, [router]);

  
// return <>{children}</>;



// const checkIfUserIsShopOwner = () => {
//     onAuthStateChanged(auth, (user) => {
//       if (user && user.uid === SHOP_OWNER_UID) {
//         setUser(user);
//         // console.log("hey user!");
//         router.replace('/dashboard');
//       } else {
//         //   console.log("you are not the user!");
//         //   setUser(null);
//           router.replace('/login');
//       }
//     });
//   };
// //   checkIfUserIsShopOwner ();

// };


// export default ProtectedRoute;

useEffect(() => {
    const checkIfUserIsShopOwner = () => {
      onAuthStateChanged(auth, (authUser) => {
        if (authUser && authUser.uid === SHOP_OWNER_UID && !user) {
            // console.log('authUser :>> ', authUser);
          setUser(authUser);
          // router.replace('/dashboard');
        } else if (authUser && authUser.uid !== SHOP_OWNER_UID && !user) {
          setUser(null);
        // console.log('no!');
          router.replace('/login');
        }
      });
    };

    checkIfUserIsShopOwner();
  }, [router, user]);

  if (!user) {
    // Loading spinner or any other loading indication can be placed here
    return null;
    
  }

  return <>{children}</>;
};

export default ProtectedRoute;