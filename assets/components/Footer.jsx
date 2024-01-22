import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "../svg/Linkedin";
import { Github } from "../svg/Github";
import { FrontendMentor } from "../svg/FrontendMentor";
import { motion } from "framer-motion";
import { useScrollY } from "../hooks/useScrollY";
import { headerVariants } from "../utils";
import { useTheme } from "../hooks/useTheme";

export function Footer () {

   const { theme, setTheme } = useTheme()
   const { isScrolledBot } = useScrollY()

   const handleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

   return (
      <motion.footer
         initial={'visible'}
         animate={isScrolledBot || window.scrollY < 30 ? 'visible' : 'hidden'}
         variants={headerVariants}
         className="footer">

         <nav className="navbar">
            <Link to={'https://www.linkedin.com/in/steven-durand-1486b82a1/'}>
               <Linkedin />
            </Link>

            <Link to={'https://github.com/SdevWeb7'}>
               <Github />
            </Link>


            <Link to={'https://www.frontendmentor.io/profile/Veustyle'}>
               <FrontendMentor />
            </Link>

         </nav>

         <motion.div
            onClick={handleTheme}
            data-isdark={theme === 'dark'}
            className="btn-theme">
            <motion.div layout className="btn"></motion.div>
         </motion.div>
      </motion.footer>
   )
}