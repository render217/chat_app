import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import UIStateProvider from './context/UiStateProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UIStateProvider>
      <App />
    </UIStateProvider>
  </BrowserRouter>
)
