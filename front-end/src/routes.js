import { createBrowserRouter } from "react-router-dom";

import Logon from "./pages/Logon";
import NewIncident from "./pages/NewIncident";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Logon />,
  },
  {
    path: "/logon",
    element: <Logon />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/incidents/new",
    element: <NewIncident />,
  },
]);

export default router;
