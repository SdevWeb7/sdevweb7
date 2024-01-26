import React from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "../svg/Linkedin";
import { Github } from "../svg/Github";
import { FrontendMentor } from "../svg/FrontendMentor";
import { motion } from "framer-motion";
import { useScrollY } from "../hooks/useScrollY";
import { footerVariants } from "../utils";
import { useTheme } from "../hooks/useTheme";

export function Footer () {

   const { theme, setTheme } = useTheme()
   const { isScrolledBot } = useScrollY()

   const handleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

   return (
      <motion.footer
         initial={'visible'}
         animate={isScrolledBot || window.scrollY < 30 ? 'visible' : 'hidden'}
         variants={footerVariants}
         transition={{duration: .5}}
         className="footer">

         <nav className="navbar">
            <Link to={'https://www.linkedin.com/in/steven-durand-1486b82a1/'} target={'_blank'}>
               <Linkedin />
            </Link>

            <Link to={'https://github.com/SdevWeb7'} target={'_blank'}>
               <Github />
            </Link>


            <Link to={'https://www.frontendmentor.io/profile/Veustyle'} target={'_blank'}>
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