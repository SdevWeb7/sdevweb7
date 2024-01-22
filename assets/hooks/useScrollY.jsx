import React, { useEffect, useState } from "react";

export function useScrollY () {
   const [scrollY, setScrollY] = useState(0)
   const [isScrolledBot, setIsScrolledBot] = useState(false)

   useEffect(() => {
      document.addEventListener('scroll', handleScroll)

      return () => {
         document.removeEventListener('scroll', handleScroll)
      }
   }, [])


   const handleScroll = () => {
      setScrollY((prevScrollY) => {
         if (window.scrollY > prevScrollY && window.scrollY > 30) {
            setIsScrolledBot(true);
         } else {
            setIsScrolledBot(false);
         }
         return window.scrollY;
      });
   };


   return { isScrolledBot }

}