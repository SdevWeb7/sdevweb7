import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./pages/Layout";
import { Contact } from "./pages/Contact";
import { Todos } from "./pages/Todos";
import { Subscribe } from "./pages/Subscribe";
import { useAppStore } from "./store";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { ReinitPassword } from "./pages/ReinitPassword";

function App () {

   const updateUser = useAppStore.use.updateUser()

   useEffect(() => {
      fetch('/me').then(r => r.json()).then(d => updateUser(d))
   }, [])

   return (
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<Layout />}>
               <Route path={'/'} element={<Home />} />
               <Route path={'/:token'} element={<ReinitPassword />} />
               <Route path={'/subscribe'} element={<Subscribe />} />
               <Route path={'/login'} element={<Login />} />
               <Route path={'/reset_password'} element={<ResetPassword />} />
               <Route path={'/contact'} element={<Contact />} />
               <Route path={'/todos'} element={<Todos />} />
               <Route path={'/*'} element={<NotFound />} />
            </Route>

         </Routes>
      </BrowserRouter>
   )
}
export default App;