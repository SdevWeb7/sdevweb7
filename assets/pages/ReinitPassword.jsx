import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reinitPasswordSchema } from "../FormAuthSchemas";
import { useParams } from "react-router-dom";
import EventBus from "../hooks/EventBus";

export function ReinitPassword () {

   const { token } = useParams()

   const {register, handleSubmit, formState: {isValid, isSubmitting, errors}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(reinitPasswordSchema)
   })

   const onSubmit = (data) => {
      fetch(`/reset-password/reset/${token}`, {
         method: 'POST',
         body: data.password
      }).then(r => r.json()).then(d => {
         if (Object.keys(d).length > 0) {
            EventBus.emit('ToastMessage', [{type: 'error', messages: [d.error]}])
         } else {
            window.location.href = '/login'
         }
      })
   }

   return (
      <form className={'auth-form'}>
         <h1>Changement du mot de passe</h1>


         <input
            placeholder={'Nouveau mot de passe'}
            {...register("password", { required: true })}
            autoComplete={'current-password'} />
         {errors.password && <span>{errors.password.message}</span>}


         <input
            placeholder={'Répéter mot de passe'}
            {...register("password", { required: true })}
            autoComplete={'current-password'} />
         {errors.password && <span>{errors.password.message}</span>}


         <input
            type={"submit"}
            onClick={handleSubmit(onSubmit)}
            value={'Changer mot de passe'}
            className={!isValid || isSubmitting ? '' : 'submit-valid'} />

      </form>
   )

}