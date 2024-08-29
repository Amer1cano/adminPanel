import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import Loader from './components/loader/Loader.jsx'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
   <Suspense fallback={<div><Loader/></div>}>

    <Provider store={store}>
      <BrowserRouter>
         <App />
    </BrowserRouter>
    </Provider>
   </Suspense>
   
  </StrictMode>,
)
