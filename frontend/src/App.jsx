import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import './App.css'


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Navigation />
            <Outlet />
          </>
        ),
        children: [
          {
            path: '/login',
            element: <LoginFormPage />,
          },
          {
            path: "/signup",
            element: <SignupFormPage />
          }
        ],
      },
    ],
  },
]);



function App() {
  return <RouterProvider router={router} />
}

export default App