import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import Error404 from './pages/error404';
 
import Profile from "./pages/Profile";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from './pages/sign-in/Singin.jsx';
import Signup from './pages/Signup';
import EditTask from "pages/edit-task/editTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404 />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/edit-task/:strindId",
    element: <EditTask />,
  },


  {
    path: "/signup",
    element: <Signup />,
  },



  {
    path: "/about",
    element: <About />,
  },

 
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
