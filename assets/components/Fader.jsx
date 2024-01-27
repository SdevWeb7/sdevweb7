import React from "react";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";

export function Fader ({children, className = ''}) {

   const divRef = useRef(null)
   const { isInView } = useInView(divRef)

   return (
      <motion.div
         className={className}
         ref={divRef}
         initial={{transform: 'translateY(20px)', opacity: 0}}
         whileInView={{transform: "translateY(0)", opacity: 1}}
         animate={isInView}
         transition={{ease: 'easeInOut', duration: .7}}>

         {children}
      </motion.div>
   )
}