import './styles/app.scss';
import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";


ReactDOM.createRoot(document.querySelector('#react')).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)