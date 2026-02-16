import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './components/auth/Login';
import Home from './components/Home';
import Signup from './components/auth/Signup';

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
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
