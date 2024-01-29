import React from "react";
import { ArrowDouble } from "../svg/ArrowDouble";
import { Fader } from "../components/Fader";

export function Home () {

   return (
      <><h1>Parcours</h1>

      <div className={'home'}>
         <Fader className={'symfony'}>
         <table>
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
         </Fader>


      <ArrowDouble className={'arrow1'} />
         <Fader className={'react'}>
         <table>
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
               <td>Zustand, ReduxToolkit, RxJS</td>
            </tr>
            <tr>
               <td>ReactHookForm (+yup)</td>
            </tr>
            <tr>
               <td>Framer-motion</td>
            </tr>
            </tbody>
         </table>
         </Fader>


         <ArrowDouble className={'arrow2'} />
         <Fader className={'css'}>
         <table>
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
         </Fader>

         <ArrowDouble className={'arrow3'} />
         <Fader className={'outils'}>
            <table>
               <thead>
               <tr>
                  <th>Outils</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                  <td>GitHub</td>
               </tr>
               <tr>
                  <td>Figma</td>
               </tr>
               <tr>
                  <td>PhpStorm</td>
               </tr>
               <tr>
                  <td>Linux</td>
               </tr>
               </tbody>
            </table>
         </Fader>
      </div>
      </>)
}