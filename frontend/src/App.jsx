import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import LoginFormPage from './LoginFormPage/LoginFormPage';

const router = createBrowserRouter([

  {
    path: '/',
    element: <h1>Welcome!</h1>
  },
  
  {
  path: '/login',
  element: <LoginFormPage />
  },

]);
function App() {

  return <RouterProvider router={router}/>   
  
}

export default App
