import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WebsiteMain from "./Pages/Website/Main";
import AdminMain from "./Pages/Admin/Main";
import Home from "./Pages/Website/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import CategoryView from "./Pages/Admin/category/View";
import ProductView from "./Pages/Admin/product/View";

import ProductAdd from "./Pages/Admin/product/Add"
import ProductEdit from "./Pages/Admin/product/Edit"
import Cart from "./Pages/Website/Cart";
import LoginWeb from "./Pages/Website/Login"
import SignUp from "./Pages/Website/Signup"
import WebMyProfile from "./Pages/Website/MyProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { lsToCart } from "./Reducers/cartSlice";
import { lsLogin } from "./Reducers/UserSlice";
import Checkout from "./Pages/Website/Checkout";
import ThankYou from "./Pages/Website/ThankYou";
import CreateMedi from "./Pages/Website/CreateMedi";
import MedicineBuyingPage from "./Pages/Website/MedicineBuyingPage";
import Scan from "./Pages/Website/Scan";
import Quick_tests from "./Pages/Website/Quick_tests";
import Doctor from "./Pages/Website/Doctor";

function App() {
  const dispatcher = useDispatch();

  useEffect(
    () => {
      dispatcher(lsToCart());
      dispatcher(lsLogin());
    },
    []
  )

  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <WebsiteMain />,
        children: [
          {
            path: "",
            element: <Home />
          }, 
           {
            path: "scan",
            element: <Scan />
           }
          ,
          {
            path: "buy_medicine",
            element: <MedicineBuyingPage />
           }
           ,
            {
            path: "cart",
            element: < Cart />
          }
          ,
          {
            path: "create_medi",
            element: <CreateMedi />
          } ,
          {
            path: "doctors",
            element: <Doctor />
          } ,
          {
            path: "quick_tests",
            element: <Quick_tests />
          } ,
           {
            path: "my-profile",
            element: < WebMyProfile />
          }
          , {
            path: "checkout",
            element: < Checkout />
          }
          , {
            path: "thank-you/:order_id",
            element: < ThankYou />
          }
        ]
      }, {
        path: "login",
        element: <LoginWeb />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "/admin",
        element: <AdminMain />,
        children: [
          {
            path: "",
            element: <Dashboard />
          },
          {
            path: "category",
            element: <CategoryView />
          }
          , {
            path: "product",
            element: <ProductView />
          }
          , {
            path: "product/add",
            element: <ProductAdd />
          }, {
            path: "product/edit/:id",
            element: <ProductEdit />
          }
        ]
      },
    ]
  )
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
