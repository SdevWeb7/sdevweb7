import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchemas } from "../FormSchemas";
import EventBus from "../hooks/EventBus";
import { Spinner } from "../components/Spinner";
import { useAppStore } from "../store";
import { Fader } from "../components/Fader";

export function Subscribe () {
   const user = useAppStore.use.user()
   const [symfonyErrors, setSymfonyErrors] = useState([])
   const {register, handleSubmit, formState: {isValid, isSubmitting, errors}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(registerSchemas)
   })

   const onSubmit = (data) => {
      fetch('/register', {
         method: 'POST',
         body: JSON.stringify(data)
      }).then(r => {
         if (!r.ok) {
            EventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème interne']}])
            throw new Error('Serveur Error')
         }
         return r.json()
      }).then(d => {
         if (Object.keys(d).length > 0) {
            setSymfonyErrors(d)
         } else {
            window.location.href = '/'
         }
      })
   }


   if (user === null) {
      return <Spinner />
   } else if (Object.keys(user).length > 0) {
      window.location = '/'
   } else {
      return (
         <Fader>
         <form className={'auth-form'}>
            <h1>Inscription</h1>

            {symfonyErrors.map(e => {
               for (let [key, value] of Object.entries(e)) {
                  return <p key={`${key}-${Math.floor(Math.random() * 100)}`}>{key}: {value}</p>
               }
            })}

            <input placeholder={'Email Address'} {...register("email", {required: true})}
                   autoComplete={'current-email'}/>
            {errors.email && <span>{errors.email.message}</span>}

            <input type={'password'} placeholder={'Mot de passe'}
                   autoComplete={'current-password'} {...register("password", {required: true})} />
            {errors.password && <span>{errors.password.message}</span>}

            <input type={"submit"} className={! isValid || isSubmitting ? '' : 'submit-valid'}
                   onClick={handleSubmit(onSubmit)} value={'Inscription'}/>

         </form>
         </Fader>
      )
   }
}