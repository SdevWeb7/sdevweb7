import React, { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export function useTheme () {

   const [theme, setTheme] = useLocalStorage('dark', window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')

   useEffect(() => {
      document.body.setAttribute('data-theme', theme)
   }, [theme])


   return { theme, setTheme }
}