import React from "react";
import { motion } from "framer-motion";
import { closeVariants } from "../utils";

export function CloseMenu ({isOpen, setIsOpen}) {

   return (
      <div className="burger" onClick={() => setIsOpen(v => !v)}>

         <motion.div variants={closeVariants.variant1} animate={isOpen ? 'closed' : 'opened'} transition={{duration: .3}}></motion.div>

         <motion.div variants={closeVariants.variant2} animate={isOpen ? 'closed' : 'opened'} transition={{duration: .3}}></motion.div>

         <motion.div variants={closeVariants.variant3} animate={isOpen ? 'closed' : 'opened'} transition={{duration: .3}}></motion.div>
      </div>
   )
}