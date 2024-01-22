import React from "react";
import { motion } from "framer-motion";
import { burgerVariants } from "../utils";

export function OpenMenu ({isOpen, setIsOpen}) {

   return (
      <div className="burger" onClick={() => setIsOpen(v => !v)} >

         <motion.div variants={burgerVariants.variant1} animate={isOpen ? 'opened' : 'closed'} transition={{duration: .3}}></motion.div>

         <motion.div variants={burgerVariants.variant2} animate={isOpen ? 'opened' : 'closed'} transition={{duration: .3}}></motion.div>

         <motion.div variants={burgerVariants.variant3} animate={isOpen ? 'opened' : 'closed'} transition={{duration: .3}}></motion.div>
      </div>
   )
}