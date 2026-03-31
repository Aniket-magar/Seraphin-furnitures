import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SeraphimNavbar from "./components/nav-bar";
import About from "./components/about";
import Blog from "./components/blog";
import Applayout from "./Applayout/applayout";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",          
      element: <Applayout></Applayout>,
      children: [

        {
          path: "/",          
          element: <SeraphimNavbar />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/blog",
          element: <Blog />
        }
      ]
      
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;