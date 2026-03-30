import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SearchBar from './SearchBar.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchBar />
  </StrictMode>,
)
