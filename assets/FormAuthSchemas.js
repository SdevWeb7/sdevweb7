import * as yup from 'yup'

const emailPhrase = 'Veuillez entrer une adresse email valide.';
const passPhrase = 'Veuillez entrer un mot de passe valide (minimum 6 caractères.';

export const registerSchemas = yup.object().shape({
   email: yup.string().email(emailPhrase).required(emailPhrase).typeError(emailPhrase),
   password: yup.string().required(passPhrase).min(6, passPhrase).typeError(passPhrase)
})

export const loginSchemas = yup.object().shape({
   username: yup.string().email(emailPhrase).required(emailPhrase).typeError(emailPhrase),
   password: yup.string().required(passPhrase).min(6, passPhrase).typeError(passPhrase)
})