import React from "react";
import { Fader } from "../components/Fader";
import { Heart } from "../svg/Heart";
import { useAppStore } from "../store";
import { HeartFill } from "../svg/HeartFill";
import EventBus from "../hooks/EventBus";

export function Projects () {
   const user = useAppStore.use.user();
   const updateUser = useAppStore.use.updateUser();

   const handleLike = (project) => {
      fetch('/api_like', {
         method: 'POST',
         body: project
      }).then(r => {
         if (!r.ok) {
            EventBus.emit('ToastMessage', [{type: 'error', messages: ['Problème serveur']}])
         } else {
            return r.json()
         }
      }).then(d => {
         EventBus.emit('ToastMessage', [{type: 'success', messages: ["Merci d'avoir donné votre avis!"]}])
         fetch('/api_me').then(r => r.json()).then(d => updateUser(d))
      })

   };


   return (
      <>
         <h1>Projects</h1>
         <p className={'projects-title'}>Front-End</p>


         <Fader>
         <div className="project">
            <img src="/images/designo.jpg" alt="Designo" />

            <div className="project-links">
               <div onClick={() => handleLike('designo')} className="like">
                  {user && user.likes && user.likes.includes('designo') ? <HeartFill /> : <Heart />}
               </div>

               <a href="https://sdevweb7.github.io/Designo" target={'_blank'}>Démo Live: GithubPages</a>

               <a href="https://github.com/SdevWeb7/Designo" target={'_blank'}>Code Source: Github</a>
            </div>
         </div>
         </Fader>

         <Fader>
         <div className="project project-pair">
            <div className="project-links">
               <div onClick={() => handleLike('payapi')} className="like">
                  {user && user.likes && user.likes.includes('payapi') ? <HeartFill /> : <Heart />}
               </div>
               <a href="https://sdevweb7.github.io/PayApi" target={'_blank'}>Démo Live: GithubPages</a>

               <a href="https://github.com/SdevWeb7/PayApi" target={'_blank'}>Code Source: Github</a>
            </div>

            <img src="/images/payapi.jpg" alt="PayApi" />
         </div>
         </Fader>

         <Fader>
            <div className="project">
               <img src="/images/sneakers.jpg" alt="Sneakers" />

               <div className="project-links">
                  <div onClick={() => handleLike('sneakers')} className="like">
                     {user && user.likes && user.likes.includes('sneakers') ? <HeartFill /> : <Heart />}
                  </div>
                  <a href="https://sdevweb7.github.io/Sneakers" target={'_blank'}>Démo Live: GithubPages</a>

                  <a href="https://github.com/SdevWeb7/Sneakers" target={'_blank'}>Code Source: Github</a>
               </div>
            </div>
         </Fader>

         <Fader>
            <div className="project project-pair">
               <div className="project-links">
                  <div onClick={() => handleLike('spacex')} className="like">
                     {user && user.likes && user.likes.includes('spacex') ? <HeartFill /> : <Heart />}
                  </div>
                  <a href="https://sdevweb7.github.io/SpaceX" target={'_blank'}>Démo Live: GithubPages</a>

                  <a href="https://github.com/SdevWeb7/SpaceX" target={'_blank'}>Code Source: Github</a>
               </div>

               <img src="/images/spacex.jpg" alt="SpaceX" />
            </div>
         </Fader>

         <p className={'projects-title'}>Back-end</p>

         <Fader>
            <div className="project">
               <img src="/images/linksharing.jpg" alt="Links-sharing" />

               <div className="project-links">
                  <div onClick={() => handleLike('linkssharing')} className="like">
                     {user && user.likes && user.likes.includes('linkssharing') ? <HeartFill /> : <Heart />}
                  </div>

                  <a href="https://github.com/SdevWeb7/ChallengeLinks" target={'_blank'}>Code Source: Github</a>
               </div>
            </div>
         </Fader>

         <Fader>
            <div className="project project-pair">
               <div className="project-links">
                  <div onClick={() => handleLike('sdevweb7')} className="like">
                     {user && user.likes && user.likes.includes('sdevweb7') ? <HeartFill /> : <Heart />}
                  </div>
                  <a href="https://github.com/SdevWeb7/sdevweb7" target={'_blank'}>Code Source: Github</a>
               </div>

               <img src="/images/sdevweb7.jpg" alt="Sdevweb7" />
            </div>
         </Fader>

         <Fader>
            <div className="project">
               <img src="/images/sdevweb.jpg" alt="Sdevweb" />

               <div className="project-links">
                  <div onClick={() => handleLike('sdevweb')} className="like">
                     {user && user.likes && user.likes.includes('sdevweb') ? <HeartFill /> : <Heart />}
                  </div>
                  <a href="https://github.com/SdevWeb7/sdevweb" target={'_blank'}>Code Source: Github</a>
               </div>

            </div>
         </Fader>
      </>
   );
}