import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WebsiteMain from "./Pages/Website/Main";
import AdminMain from "./Pages/Admin/Main";
import Home from "./Pages/Website/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import CategoryView from "./Pages/Admin/category/View";
import ProductView from "./Pages/Admin/product/View";
import ColorView from "./Pages/Admin/color/View";
import ColorAdd from "./Pages/Admin/color/Add";
import ColorEdit from "./Pages/Admin/color/Edit";
import ProductAdd from "./Pages/Admin/product/Add"
import ProductEdit from "./Pages/Admin/product/Edit"
import Store from "./Pages/Website/Store";
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
          }, {
            path: "store/:category_slug?",
            element: <Store />
          }
           ,
           {
            path: "buy_medicine",
            element: <MedicineBuyingPage />
           }
          , {
            path: "cart",
            element: < Cart />
          }
          ,
          {
            path: "create_medi",
            element: <CreateMedi />
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
          , {
            path: "color",
            element: <ColorView />
          }
          , {
            path: "color/add",
            element: <ColorAdd />
          }
          , {
            path: "color/edit/:id",
            element: <ColorEdit />
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
