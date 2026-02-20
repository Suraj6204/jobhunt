import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/auth/Login';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import VerifyEmail from './components/auth/VerifyEmail';
import { Toaster } from 'sonner'; // 1. Import Toaster

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/verify-email',
      element: <VerifyEmail /> 
    },
  ]);

  return (
    <div>
      {/* 2. RouterProvider ke saath Toaster rakhein */}
      <RouterProvider router={appRouter} />
      
      <Toaster 
        position="top-center"
        richColors
        toastOptions={{
          style: {
            background: 'white',
          },
          success: {
            style: {
              backgroundColor: '#f0fdf4', 
              border: '1px solid #22c55e', 
              color: '#166534',
            },
          },
          error: {
            style: {
              backgroundColor: '#fee2e2', 
              border: '1px solid #e32e2e', 
              color: '#b91c1c',
            },
          },
        }} 
      />
    </div>
  )
}

export default App;