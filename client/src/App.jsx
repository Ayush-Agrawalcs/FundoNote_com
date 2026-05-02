import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Otp from "./Pages/Otp";

import Notes from "./Components/Notes/Notes";
import Archive from "./Components/Archive/Archive";
import Trash from "./Components/Trash/Trash";


import ProtectedRoute from "./Routes/ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Notes />,
          },
          {
            path: "archive",
            element: <Archive />,
          },
          {
            path: "trash",
            element: <Trash />,
          },
        ],
      },
    ],
  },

  // PUBLIC ROUTES
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
