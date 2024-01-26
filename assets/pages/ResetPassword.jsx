import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../FormSchemas";
import EventBus from "../hooks/EventBus";
import { Fader } from "../components/Fader";

export function ResetPassword () {

   const {register, handleSubmit, formState: {isValid, isSubmitting, errors}} = useForm({
      mode: 'onBlur',
      resolver: yupResolver(resetPasswordSchema)
   })

   const onSubmit = (data) => {
      fetch('/reset-password', {
         method: 'POST',
         body: data.email
      }).then(r => r.json()).then(d => {
         if (Object.keys(d).length > 0) {
            EventBus.emit('ToastMessage', [{type: 'error', messages: [d.error]}])
         } else {
            window.location.href = "/"
         }
      })
   }

   return (
      <Fader>
      <form className={'auth-form'}>
         <h1>Réinitialisation du mot de passe</h1>


         <input placeholder={'Email Address'} {...register("email", { required: true })} autoComplete={'current-email'} />
         {errors.email && <span>{errors.email.message}</span>}


         <input type={"submit"} className={!isValid || isSubmitting ? '' : 'submit-valid'} onClick={handleSubmit(onSubmit)} value={'Faire la demande'} />

      </form>
      </Fader>
   )

}
