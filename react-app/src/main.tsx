import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
//import 'bootstrap/dist/css/bootstrap.css'

//用於創建一個 React root 實例，它負責管理應用程式的渲染
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
