import './styles/app.scss';
import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux";


ReactDOM.createRoot(document.querySelector('#react')).render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>
)