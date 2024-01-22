import { useEffect, useState } from "react";
import EventBus from "./EventBus";

export function useFetch(url, options = {}) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(url, options);
            if (!response.ok) {
               EventBus.emit('ToastMessage', [{type: 'error', messages: [`HTTP Error Status: ${response.status}`]}])
               throw new Error(`HTTP Error Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
         } catch (e) {
            setError(e);
         } finally {
            setLoading(false);
         }
      };
      fetchData();
   }, [url, options]);

   return { data, loading, error };
}