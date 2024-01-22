import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { OpenMenu } from "./OpenMenu";
import { Menu } from "./Menu";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollY } from "../hooks/useScrollY";
import { headerVariants } from "../utils";

export function Header () {
   const [isOpenMenu, setIsOpenMenu] = useState(false)
   const { isScrolledBot } = useScrollY()

   return (
      <motion.header
         initial={'visible'}
         animate={isScrolledBot && !isOpenMenu ? 'hidden' : 'visible'}
         variants={headerVariants}
         transition={{duration: .5}}
         className="header">

         <nav className="navbar">
            <NavLink to={'/'}>
               SDevWeb
            </NavLink>
         </nav>

         <OpenMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />

         <AnimatePresence>
            {isOpenMenu && <Menu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />}
         </AnimatePresence>

      </motion.header>
   )
}