import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { burgerVariants, closeVariants } from "../utils";
import { Menu } from "./Menu";
import { useAppStore } from "../store";
import { IconBurger } from "../svg/IconBurger";
import { IconClose } from "../svg/IconClose";

export function Burger () {
   const isOpenMenu = useAppStore.use.isOpenMenu()
   const setOpenMenu = useAppStore.use.setOpenMenu()
   const [initialLoad, setInitialLoad] = useState(true)

   useEffect(() => {setInitialLoad(false)}, [])

   const handleMenu = (e) => {
      e.stopPropagation()
      setOpenMenu()
   }

   return (
      <>
      <div className="burger" onClick={handleMenu}>

         <AnimatePresence mode={'popLayout'}>
            {isOpenMenu &&
               <motion.div
                  initial={"hidden"}
                  exit={'hidden'}
                  animate={isOpenMenu ? 'visible' : "hidden"}
                  variants={closeVariants}
                  transition={{duration: .5}}>
                  <IconClose />
               </motion.div>}
         </AnimatePresence>

         <AnimatePresence mode={'popLayout'}>
            {!isOpenMenu &&
               <motion.div
                  initial={initialLoad ? 'visible' : "hidden"}
                  exit={'hidden'}
                  animate={isOpenMenu ? 'hidden' : "visible"}
                  variants={burgerVariants}
                  transition={{duration: .5}}>
                  <IconBurger />
               </motion.div>}
         </AnimatePresence>

      </div>


      <AnimatePresence>
         {isOpenMenu && <Menu />}
      </AnimatePresence>
      </>
   )
}