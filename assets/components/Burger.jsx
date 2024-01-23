import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { burgerVariants, closeVariants } from "../utils";
import { Menu } from "./Menu";

export function Burger () {
   const [isOpenMenu, setIsOpenMenu] = useState(false)

   const handleMenu = (e) => {
      e.stopPropagation()
      setIsOpenMenu(v => !v)
   }

   return (
      <>
      <div className="burger" onClick={handleMenu}>


         <AnimatePresence mode={'popLayout'}>
            {isOpenMenu &&
               <motion.img
                  src="/close_icon.png"
                  alt="close-menu"
                  initial={"hidden"}
                  exit={'hidden'}
                  animate={isOpenMenu ? 'visible' : "hidden"}
                  variants={closeVariants}
                  transition={{duration: .5}} />}
         </AnimatePresence>

         <AnimatePresence mode={'popLayout'}>
            {!isOpenMenu &&
               <motion.img
                  src="/burger.png"
                  alt="open-menu"
                  initial={"hidden"}
                  exit={'hidden'}
                  animate={isOpenMenu ? 'hidden' : "visible"}
                  variants={burgerVariants}
                  transition={{duration: .5}} />}
         </AnimatePresence>

      </div>


      <AnimatePresence>
         {isOpenMenu && <Menu setIsOpen={setIsOpenMenu} />}
      </AnimatePresence>
      </>
   )
}