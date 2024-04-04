// this is my custom hook for redirecting user if he decides to use
// dropdown offcanvas when inside other than shop/index page
// this approach helps me keep my code DRY = DON'T REPEAT YOURSELF

import { useRouter } from "next/router";
import { useEffect } from "react";

// we use 2 parameters - "condition" and "redirectTo". 
//for ex. we gonna use it like: "useRedirectOnCondition(filteredProducts.length > 0, '/shop');"
export function useRedirectOnCondition (condition, redirectTo) {
    const router = useRouter();

    useEffect(() => {
     if (condition) {
        // let's try to use callback function which is gonna be executed after state update
        const redirectCallback = () => {
            router.push(redirectTo);
        
     };
     //and call callback here
     redirectCallback();
    }
    }, [condition, redirectTo, router])
    
}