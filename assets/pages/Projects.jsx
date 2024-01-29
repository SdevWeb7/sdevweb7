import React, { useEffect, useState } from "react";
import { Fader } from "../components/Fader";
import { Heart } from "../svg/Heart";
import { useAppStore } from "../store";

export function Projects () {
   const user = useAppStore.use.user();
   const [userLikes, setUserLikes] = useState([])

   useEffect(() => {
      if (user) {
         console.log(user.likes)
      }
   }, [])

   return (
      <>
         <h1>Projects</h1>
         <p className={'projects-title'}>Front-End</p>


         <Fader>
         <div className="project">
            <img src="/images/designo.jpg" alt="Designo" />

            <div className="project-links">
               <Heart className={'like'} />
               <a href="https://sdevweb7.github.io/Designo" target={'_blank'}>Démo Live: GithubPages</a>

               <a href="https://github.com/SdevWeb7/Designo" target={'_blank'}>Code Source: Github</a>
            </div>
         </div>
         </Fader>

         <Fader>
         <div className="project project-pair">
            <div className="project-links">
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
                  <a href="https://sdevweb7.github.io/Sneakers" target={'_blank'}>Démo Live: GithubPages</a>

                  <a href="https://github.com/SdevWeb7/Sneakers" target={'_blank'}>Code Source: Github</a>
               </div>
            </div>
         </Fader>

         <Fader>
            <div className="project project-pair">
               <div className="project-links">
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
                  <a href="https://github.com/SdevWeb7/ChallengeLinks" target={'_blank'}>Code Source: Github</a>
               </div>
            </div>
         </Fader>

         <Fader>
            <div className="project project-pair">
               <div className="project-links">
                  <a href="https://github.com/SdevWeb7/sdevweb7" target={'_blank'}>Code Source: Github</a>
               </div>

               <img src="/images/sdevweb7.jpg" alt="Sdevweb7" />
            </div>
         </Fader>

         <Fader>
            <div className="project">
               <img src="/images/sdevweb.jpg" alt="Sdevweb" />

               <div className="project-links">
                  <a href="https://github.com/SdevWeb7/sdevweb" target={'_blank'}>Code Source: Github</a>
               </div>

            </div>
         </Fader>
      </>
   );
}