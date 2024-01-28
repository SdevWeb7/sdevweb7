import React, { useEffect, useRef, useState } from "react";
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Fader } from "../components/Fader";

export function Rxjs () {
   const [pays, setPays] = useState([]);
   const inputRef = useRef(null);

   useEffect(() => {
      const frappes$ = fromEvent(inputRef.current, 'input').pipe(
         map(event => event.target.value),
         debounceTime(300),
         distinctUntilChanged(),
         filter(value => value.length >= 3),
         switchMap(() => ajax(`/countries.json`)),
         map(reponse => reponse.response.filter(country => country.name.toLowerCase()
            .includes(inputRef.current.value.toLowerCase()))
            .slice(0, 9)),
      );
      const subscription = frappes$.subscribe((countries) => {setPays(countries);});
      return () => {subscription.unsubscribe();};
   }, [])


   return (
      <><div className={'title'}>
         <div className="earth-to-right"></div>
         <h1>RxJS</h1>
         <div className="earth-to-left"></div>
      </div>

         <div className="rxjs-search">
            <input
               ref={inputRef}
               type="text"
               placeholder={"Entrez le nom d'un pays"} />
         </div>


         <Fader>
         <div className="rxjs">
            {pays.length > 0 && pays.map(p =>
               <article
                  key={Date.now() * Math.floor(Math.random() * 1000)}
                  className="pays">

                  <img src={p.flags.png} alt={p.name+'-flag'} />

                  <div className="details">
                     <h2><strong>Nom: </strong>{p.name}</h2>
                     <h2><strong>Capitale: </strong>{p.capital}</h2>
                     <h2><strong>Région: </strong>{p.region}</h2>


                     <h2><strong>Population: </strong>
                        {p.population.toString()
                                       .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} habitants</h2>

                     {p.area && <h2><strong>Surface: </strong>
                           {p.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km²</h2>}

                     <h2><strong>Languages: </strong>
                        {p.languages.map(l => <span key={Math.floor(Math.random() * 10000)}>{l.name} ({l.nativeName}), </span>)}
                     </h2>

                     {p.currencies && p.currencies.map(c => <h2 key={Math.floor(Math.random() * 10000)}><strong>Monnaie: </strong>
                        {c.name} ({c.symbol})</h2>)}

                     <h2><strong>Top-Level-Domain: </strong>
                        {p.topLevelDomain}</h2>
                  </div>
               </article>)}


            {pays.length === 0 && <h2 className={'no-result'}>Entrez le nom d'un pays pour commencer la recherche</h2>}
         </div>
         </Fader>
      </>)
}
