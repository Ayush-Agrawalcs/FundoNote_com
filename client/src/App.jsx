import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import Notes from "./Components/Notes/Notes";
import Reminders from "./Components/Reminders/Reminders";
import Archive from "./Components/Archive/Archive";
import Trash from "./Components/Trash/Trash";
import Edit from "./Components/Edit/Edit";

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
            path: "reminders",
            element: <Reminders />,
          },
          {
            path: "edit",
            element: <Edit />,
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
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
