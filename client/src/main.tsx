import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateRoom from './pages/CreateRoom.tsx'

const router = createBrowserRouter([
  {
    path: '/room',
    element: <CreateRoom />,
  },
  {
    path: '/',
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
