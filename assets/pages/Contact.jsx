import React, { useState } from "react";
import { Fader } from "../components/Fader";
import EventBus from "../hooks/EventBus";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../FormSchemas";

export function Contact () {
   const [symfonyError, setSymfonyError] = useState('')
   const {register, handleSubmit, formState: {isValid, isSubmitting, errors}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(contactSchema)
   })

   const onSubmit = (data) => {
      fetch('/api_contact', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      }).then(r => {
         if (!r.ok) {
            EventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème serveur']}])
         }
         return r.json()
      }).then(d => {
         if (Object.keys(d).length > 0) {
            setSymfonyError(d.error)
         } else {
            window.location.href = '/'
         }
      })
   }


   return (
      <>
         <Fader>
            <form className={'auth-form'}>
               <h1>Me contacter</h1>

               {symfonyError.length > 1 && <p>{symfonyError}</p>}

               <input placeholder={'Email Address'} {...register("email", { required: true })} autoComplete={'current-email'} />
               {errors.email && <span>{errors.email.message}</span>}

               <textarea placeholder={'Votre Message'}  {...register("message", { required: true })} />
               {errors.message && <span>{errors.message.message}</span>}

               <input type={"submit"} className={!isValid || isSubmitting ? '' : 'submit-valid'} onClick={handleSubmit(onSubmit)} value={'Envoyer'} />
            </form>
         </Fader>
      </>
   );
}