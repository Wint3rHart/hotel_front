import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './MainRoutes.jsx'
import NavBar from './NavBar.jsx'
let client=new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
      <NavBar/>
    <MainRoutes />
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
