import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { linksVariants } from '../utils'
import { createPortal } from "react-dom";
import { useAppStore } from "../store";

export function Menu ({isOpen, setIsOpen}) {
   const user = useAppStore.use.user()

   useEffect(() => {
      const timer = setTimeout(() => {
         document.addEventListener('click', handleClick)
      }, 50)

      return () => {
         document.removeEventListener('click',handleClick)
         clearTimeout(timer)
      }
   }, [])

   const handleClick = () => {
      setIsOpen(false)
   }

   return createPortal(
      <motion.div
         initial={{opacity: 0}}
         exit={{opacity: 0}}
         animate={{opacity: 1}}
         className="background-menu">
         <motion.div
         initial={{x: 300}}
         exit={{x: 300}}
         animate={{x: 0}}
         transition={{duration: .5}}
         className="menu">

         <motion.nav className="nav-menu">
            <ul>
               <motion.li
                  variants={linksVariants}
                  initial={'hidden'}
                  exit={'hidden'}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{duration: 1, delay: .2}}>
                  <NavLink to={"/"}>Home</NavLink>
               </motion.li>

               <motion.li
                  variants={linksVariants}
                  initial={'hidden'}
                  exit={'hidden'}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{duration: 1, delay: 0.3}}>
                  <NavLink to={"/todos"}>Todos</NavLink>
               </motion.li>

               <motion.li
                  variants={linksVariants}
                  initial={'hidden'}
                  exit={'hidden'}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{duration: 1, delay: .4}}>
                  <NavLink to={"/contact"}>Contact</NavLink>
               </motion.li>

               {user && Object.keys(user).length > 0 ?
                  <motion.li
                     variants={linksVariants}
                     initial={'hidden'}
                     exit={'hidden'}
                     animate={isOpen ? 'visible' : 'hidden'}
                     transition={{duration: 1, delay: .5}}>
                     <a href="/logout">Déconnexion</a>
                  </motion.li> :
               <><motion.li
                  variants={linksVariants}
                  initial={'hidden'}
                  exit={'hidden'}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{duration: 1, delay: .5}}>
                  <NavLink to={"/login"}>Connexion</NavLink>
               </motion.li>

               <motion.li
                  variants={linksVariants}
                  initial={'hidden'}
                  exit={'hidden'}
                  animate={isOpen ? 'visible' : 'hidden'}
                  transition={{duration: 1, delay: .6}}>
                  <NavLink to={"/subscribe"}>Inscription</NavLink>
               </motion.li></>}

            </ul>
         </motion.nav>
      </motion.div>
      </motion.div>, document.body)
}
