import React from "react";
import { NavLink } from "react-router-dom";
import { Burger } from "./Burger";
import { motion } from "framer-motion";
import { useScrollY } from "../hooks/useScrollY";
import { headerVariants } from "../utils";
import { useAppStore } from "../store";

export function Header () {
   const { isScrolledBot } = useScrollY()
   const isOpenMenu = useAppStore.use.isOpenMenu()


   return (
      <motion.header
         initial={'visible'}
         animate={isScrolledBot && !isOpenMenu ? 'hidden' : 'visible'}
         variants={headerVariants}
         transition={{duration: .5}}
         className="header">

         <nav className="navbar">
            <NavLink to={'/'} className={'logo-container'}>
               <h1 className={'logo'}>J</h1>
               <p>sdevweb</p>
            </NavLink>

            <NavLink className={'navlink'} to={'/projects'}>Projects</NavLink>

            <NavLink className={'navlink'} to={'/todolist'}>Todolist</NavLink>

            <NavLink className={'navlink'} to={'/rxjs'}>Rxjs</NavLink>

            <NavLink className={'navlink'} to={'/contact'}>Contact</NavLink>
         </nav>

         <Burger />

      </motion.header>
   )
}