import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
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
        path: "/Write",
        element: <Write />,
      },
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Single",
        element: <Single />,
      },
      {
        path: "/myprogress",
        element: <MyProgress />, // 新增的路由配置
      },
    ],
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


/*import Button from "./components/Button";


function App() {
  return (
    <div>
      <Button onClick={() => console.log('Clicked')}>My Button</Button>
    </div> //使用了 Button 組件，並傳遞了一個 onClick 屬性，這個屬性是一個回調函數：
  )
} */

/*
import Alert from "./components/Alert";


function App() {
  return (
    <div >
      <Alert>
        Hello World
      </Alert> 
    </div>
  )
} */

/* 
import ListGroup from "./components/ListGroup";

//PacalCasing
function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  
  const handleSelectItem = (item: string) => {
    console.log(item);
  }
  return (
  <div>
    <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
    </div> //這是 JSX 語法的一部分，它描述了要在 UI 中渲染的元素樹, 渲染ListGroup 組件，並傳遞了兩個 props：
)}
*/
// export default App;  // 導出此function, 其他文件導入時，會得到這個 App 函數組件的引用
