import React from "react";
import { NavLink } from "react-router-dom";
import { Burger } from "./Burger";
import { motion } from "framer-motion";
import { useScrollY } from "../hooks/useScrollY";
import { headerVariants } from "../utils";

export function Header () {
   const { isScrolledBot } = useScrollY()


   return (
      <motion.header
         initial={'visible'}
         animate={isScrolledBot ? 'hidden' : 'visible'}
         variants={headerVariants}
         transition={{duration: .5}}
         className="header">

         <nav className="navbar">
            <NavLink to={'/'}>
               SDevWeb
            </NavLink>
         </nav>

         <Burger />

      </motion.header>
   )
}