import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { linksVariants } from '../utils'
import { createPortal } from "react-dom";
import { useAppStore } from "../store";

export function Menu () {
   const user = useAppStore.use.user()
   const setOpenMenu = useAppStore.use.setOpenMenu()

   useEffect(() => {
      document.addEventListener('click', handleClick)

      return () => {
         document.removeEventListener('click', handleClick)
      }
   }, [])

   const handleClick = () => {setOpenMenu(false)}

   return createPortal(
      <motion.div
         initial={{opacity: 0}}
         exit={{opacity: 0}}
         animate={{opacity: 1}}
         transition={{duration: .5}}
         className="background-menu">

         <motion.div
         initial={{x: 300}}
         exit={{x: 300}}
         animate={{x: 0}}
         transition={{duration: .5}}
         className="menu">

         <nav className="nav-menu">
            <motion.ul
               initial={'hidden'}
               exit={'hidden'}
               animate={'visible'}
               transition={{staggerChildren: .15}}>

               <motion.li variants={linksVariants}>
                  <NavLink to={"/projects"}>Projects</NavLink>
               </motion.li>

               <motion.li variants={linksVariants}>
                  <NavLink to={"/todolist"}>Todolist</NavLink>
               </motion.li>

               <motion.li variants={linksVariants}>
                  <NavLink to={"/contact"}>Contact</NavLink>
               </motion.li>

               {user && Object.keys(user).length > 0 ?
                  <motion.li variants={linksVariants}>
                     <a href="/logout">Déconnexion</a>
                  </motion.li> :
               <><motion.li variants={linksVariants}>
                  <NavLink to={"/login"}>Connexion</NavLink>
               </motion.li>

               <motion.li variants={linksVariants}>
                  <NavLink to={"/subscribe"}>Inscription</NavLink>
               </motion.li></>}

            </motion.ul>
         </nav>
      </motion.div>
      </motion.div>, document.body)
}
