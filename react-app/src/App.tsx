import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './style.scss';
import Dashboard from './pages/Dashboard';
import MySchedule from './pages/MySchedule';
import BookClass from './pages/BookClass';
import EditProfile from './pages/EditProfile'
import KidInfo from "./pages/KidInfo";
import MyProgress from "./pages/MyProgress";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* react-router-dom 提供的組件，用於渲染嵌套路由對應的組件。 */}
      <Footer />
    </>
  );
};

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <Dashboard /> {/* Dashboard 主要顯示內容 */}
      {/*<Outlet /> 用於渲染嵌套路由對應的組件 */}
    </>
  );
};

// 創建一個路由器，並配置兩個路由：
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/myprogress",
    element: (
      <>
        <Navbar />
        <MyProgress />
      </>
    ), // 新增的路由配置，包含 Navbar 但不包含 Footer
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />, // 使用 DashboardLayout 來包含 Dashboard 頁面
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/dashboard/schedule" />, // 預設重定向到我的課表
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
