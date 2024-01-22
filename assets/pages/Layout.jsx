import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Toaster from "../components/Toaster";
import { ErrorBoundary } from "../hooks/ErrorBoundary";

export function Layout () {

   return (
      <>
         <Header />

         <main className="main">
            <ErrorBoundary
               fallback={<h1
                  className={'not-found'}>
                  Il y a eu une erreur</h1>}>
               <Outlet />
            </ErrorBoundary>
         </main>

         <Footer />


         <Toaster />
      </>
   )
}