export const burgerVariants = {
   hidden: {opacity: 0, rotate: -180},
   visible: {opacity: 1, rotate: 0}
}
export const closeVariants = {
   hidden: {opacity: 0, rotate: 180},
   visible: {opacity: 1, rotate: 0}
}
export const linksVariants = {
   hidden: {opacity: 0},
   visible: {opacity: 1}
}

export const headerVariants = {
   hidden: {y: -80, opacity: 0},
   visible: {y: 0, opacity: 1}
}
export const footerVariants = {
   hidden: {y: 60, opacity: 0},
   visible: {y: 0, opacity: 1}
}
export const toasterVariants = {
   hidden: {x: -180, opacity: 0},
   visible: {x: 0, opacity: 1}
}

export function findClassByType (type) {
   let toastClass;
   switch (type) {
      case 'success':
         toastClass = 'toast-success'
         break;
      case 'error':
         toastClass = 'toast-error'
         break;
      case 'info':
         toastClass = 'toast-info'
         break;
      default:
         toastClass = "toast"
         break
   }
   return toastClass;
}