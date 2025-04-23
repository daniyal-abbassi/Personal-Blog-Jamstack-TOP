import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ThemeProvider} from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import Admin from '../../src/pages/Admin/Admin';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Admin />
    </ThemeProvider>

  </StrictMode>,
)
