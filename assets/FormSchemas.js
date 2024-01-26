import * as yup from 'yup'

const emailPhrase = 'Veuillez entrer une adresse email valide.';
const passPhrase = 'Veuillez entrer un mot de passe valide (minimum six caractères).';
const messagePhrase = 'Veuillez entrer un message valide.';

export const registerSchemas = yup.object().shape({
   email: yup.string().email(emailPhrase).required(emailPhrase).typeError(emailPhrase),
   password: yup.string().required(passPhrase).min(6, passPhrase).typeError(passPhrase)
})

export const loginSchemas = yup.object().shape({
   username: yup.string().email(emailPhrase).required(emailPhrase).typeError(emailPhrase),
   password: yup.string().required(passPhrase).min(6, passPhrase).typeError(passPhrase)
})

export const resetPasswordSchema = yup.object().shape({
   email: yup.string().email(emailPhrase).required(emailPhrase).typeError(emailPhrase)
})
export const reinitPasswordSchema = yup.object().shape({
   password: yup.string().required(passPhrase).min(6).typeError(passPhrase)
})

export const contactSchema = yup.object().shape({
   email: yup.string().email(emailPhrase).required(emailPhrase).typeError(emailPhrase),
   message: yup.string().required(messagePhrase).min(6).max(500).typeError(messagePhrase)
})