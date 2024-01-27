import React from "react";
import { ArrowDouble } from "../svg/ArrowDouble";

export function Home () {

   return (
      <><h1>Parcours</h1>

      <div className={'home'}>
         <table className={'symfony'}>
            <thead>
               <tr>
                  <th>Symfony</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Authentification, Listeners</td>
               </tr>
               <tr>
                  <td>Controllers, Entities, Repositories</td>
               </tr>
               <tr>
                  <td>Tokens, Hash, Validations</td>
               </tr>
               <tr>
                  <td>Mailer, MessageBus</td>
               </tr>
            </tbody>
         </table>


      <ArrowDouble className={'arrow1'} />

         <table className={'react'}>
            <thead>
            <tr>
               <th>React-JS</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td>Components, Router</td>
            </tr>
            <tr>
               <td>Zustand, ReduxToolkit</td>
            </tr>
            <tr>
               <td>ReactHookForm (+yup)</td>
            </tr>
            <tr>
               <td>Framer-motion</td>
            </tr>
            </tbody>
         </table>

         <ArrowDouble className={'arrow2'} />
         <table className={'css'}>
            <thead>
            <tr>
               <th>HTML/CSS</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td>Sémantique, SEO, Accessibilité</td>
            </tr>
            <tr>
               <td>Grid, Flexbox, Animations</td>
            </tr>
            <tr>
               <td>SCSS, Tailwindcss, Bootstrap</td>
            </tr>
            <tr>
               <td>SVG</td>
            </tr>
            </tbody>
         </table>
      </div>
      </>)
}