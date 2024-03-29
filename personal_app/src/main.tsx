import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import "./Styles.css"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Give routing access to app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
