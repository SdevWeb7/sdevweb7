import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import EventBus from "../hooks/EventBus";
import { findClassByType, toasterVariants } from "../utils";
import { IconClose } from "../svg/IconClose";

export function Toaster () {
   const [toasts, setToasts] = useState([])

   useEffect(() => {
      const flashsSymfony = JSON.parse(document.getElementById('react').getAttribute('data-toasts'))
      if (flashsSymfony.length > 0) {
         setToasts((prevToasts) => [...prevToasts, ...flashsSymfony]);
      }

      EventBus.on('ToastMessage', handleToastMessage);

      return () => {
         EventBus.off('ToastMessage', handleToastMessage)
      }
   }, [])

   useEffect(() => {
      if (toasts.length > 0) {
         const timer = setTimeout(() => {
            setToasts([])
         }, 5000)

         return () => {
            clearTimeout(timer)
         }
      }
   }, [toasts])


   const handleToastMessage = (datas) => {
      setToasts((prevToasts) => [...prevToasts, ...datas]);
   }

   return <><AnimatePresence>

         {toasts.length > 0 &&
            <motion.div
               className="toaster"
               animate={toasts.length > 0 ? 'visible' : 'hidden'}
               variants={toasterVariants}
               exit={'hidden'}
               initial={'hidden'}>

               <IconClose onClick={() => setToasts([])} />

            {toasts.map(({type, messages}) => messages.map(message => <p key={message} className={findClassByType(type)}>{message}</p>))}
         </motion.div>}

         </AnimatePresence></>
}
export default Toaster;