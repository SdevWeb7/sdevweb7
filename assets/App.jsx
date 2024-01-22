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

function App () {

   const updateUser = useAppStore.use.updateUser()
   const user = useAppStore.use.user()
   console.log(user)

   useEffect(() => {
      fetch('/me').then(r => r.json()).then(d => updateUser(d))
   }, [])


   return (
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<Layout />}>
               <Route path={'/'} element={<Home />} />
               <Route path={'/subscribe'} element={<Subscribe />} />
               <Route path={'/login'} element={<Login />} />
               <Route path={'/contact'} element={<Contact />} />
               <Route path={'/todos'} element={<Todos />} />
               <Route path={'/*'} element={<NotFound />} />
            </Route>

         </Routes>
      </BrowserRouter>
   )
}
export default App;