import { useEffect, useState } from "react";

// export function useLocalStorage(key, initialValue) {
//     const [value, setValue] = useState(() => {
//         const jsonValue = localStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : initialValue;
//   });

//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(value))
//     }, [key, value]);

//     return [value, setValue];



    // export function useLocalStorage(key, initialValue) {
    //     const isServer = typeof window === "undefined";
    //     const [value, setValue] = useState(() => {
    //       try {
    //         const jsonValue = localStorage.getItem(key);
    //         return jsonValue != null ? JSON.parse(jsonValue) : initialValue;
    //       } catch (error) {
    //         // Handle error or fallback to initialValue
    //         console.error("Error accessing localStorage:", error);
    //         return initialValue;
    //       }
    //     });
      
    //     useEffect(() => {
    //       try {
    //         localStorage.setItem(key, JSON.stringify(value));
    //       } catch (error) {
    //         // Handle error
    //         console.error("Error setting localStorage:", error);
    //       }
    //     }, [key, value]);
      
    //     return [value, setValue];
    //   }

    //   import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const isServer = typeof window === "undefined";

  const [value, setValue] = useState(() => {
    try {
      if (!isServer) {
        const jsonValue = localStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : initialValue;
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }

    return initialValue;
  });

  useEffect(() => {
    try {
      if (!isServer) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

// }