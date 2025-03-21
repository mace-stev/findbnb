import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home/index'
import * as sessionActions from './store/session';
import SpotDetails from './components/SpotDetails';
import NewSpot from './components/NewSpot';
import ManageSpots from './components/ManageSpots/ManageSpots';

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
      <Navigation /> 
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
       element: <Home/>,
       path: "/"
      },
      {
        element: <SpotDetails/>,
        path: "/:id"
      },
      {
        element: <NewSpot/>,
        path: "/spots/new"
      },
      {
        element: <ManageSpots/>,
        path: "/spots/current"
      }
    ],
  },
]);



function App() {
  return <RouterProvider router={router} />
}

export default App