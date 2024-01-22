export const burgerVariants = {
   variant1: {
      closed: {rotate: 0},
      opened: {rotate: -315, y: 6}
   },
   variant2: {
      closed: {opacity: 1},
      opened: {opacity: 0}
   },
   variant3: {
      closed: {rotate: 0},
      opened: {rotate: -225, y: -6}
   },
}
export const linksVariants = {
   hidden: {opacity: 0},
   visible: {opacity: 1}
}

export const headerVariants = {
   hidden: {opacity: 0},
   visible: {opacity: 1}
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