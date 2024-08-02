import { createHashRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './style.scss';
import Dashboard from './pages/Dashboard';
import MySchedule from './pages/MySchedule';
import BookClass from './pages/BookClass';
import EditProfile from './pages/EditProfile';
import KidInfo from "./pages/KidInfo";
import MyProgress from "./pages/MyProgress";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "myprogress",
        element: <MyProgress />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="schedule" replace />,
      },
      {
        path: "schedule",
        element: <MySchedule />,
      },
      {
        path: "book-class",
        element: <BookClass />,
      },
      {
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "kidinfo",
        element: <KidInfo />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
