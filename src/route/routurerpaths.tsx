import { components } from "react-select";
import { createBrowserRouter, data, redirect } from "react-router-dom";
import SingPage from "../SingnPages/TSX/Singin";
import ValdtingSingIn from "../SingnPages/TSX/valdatonSingInPhone";
import MainPage from "../homePages/MainPage";
import LoginPage from "../LoginPages/TSX/basiclogn";
import Confirmemal from "../SingnPages/TSX/confirmemaPage";
import RePass from "../LoginPages/TSX/RePass";
import Confirm2FA from "../LoginPages/TSX/confirme2FA";
import ProductComparison from "../Productcomparison/UIProductComparison";
import Startchat from "../Chatfuncton/productexixt";
import Homeprofile from "../ProfileComponet/BasicPageprofle";
import { Navigate } from "react-router-dom";
import ProfleMang from "../ProfileComponet/infoprofile/Mangprofile";
import IdeaGive from "../ProfileComponet/Suggestions/GiveIdea";
import PageProucdt from "../ProductPage/BasicPageProduct";
import CartPage from "../Cart/PageCart";
import ChoseAddr from "../Cart/ChoseAddrs";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import WishlistPage from "../whishlist/testwshlist";
import axios from "axios";
let isAUnthed: boolean = false;
export const Routerspath = createBrowserRouter([
  { path: "/home", element: <MainPage /> },
  { path: "/home/ProductPage/:idproduct", element: <PageProucdt /> },
  { path: "/home/Cpmpare", element: <ProductComparison /> },
  {
    path: "/home/Chatbot",

    element: <Startchat />,
  },
  {
    path: "/home/Account/Wishlist",
    loader: async () => {
      try {
        await axios.get(
          "http://localhost:8087/api/WishListBascOP/isAuthorizedUser",
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        return redirect("/login");
      }
    },
    element: <WishlistPage />,
  },

  {
    path: "/home/Account/profile",
    loader: async () => {
      try {
        await axios.get("http://localhost:8087/api/Profile/isAuthented", {
          withCredentials: true,
        });
      } catch (error) {
        return redirect("/login");
      }
    },
    element: <Homeprofile />,
  },
  {
    path: "/home/Account/profile/Suggestions",
    loader: async () => {
      try {
        await axios.get("http://localhost:8087/api/Profile/isAuthented", {
          withCredentials: true,
        });
      } catch (error) {
        return redirect("/login");
      }
    },
    element: <IdeaGive></IdeaGive>,
  },
  {
    path: "/home/Account/profile/ManagementAccount",
    loader: async () => {
      try {
        await axios.get("http://localhost:8087/api/Profile/isAuthented", {
          withCredentials: true,
        });
      } catch (error) {
        return redirect("/login");
      }
    },
    element: <ProfleMang />,
  },
  {
    path: "/home/Account/Cart",

    loader: async () => {
      try {
        await axios.get("http://localhost:8087/api/Cart/IsAuthed", {
          withCredentials: true,
        });
      } catch (error) {
        return redirect("/login");
      }
    },

    element: <CartPage />,
  },
  {
    path: "/home/Account/Cart/chsoeaddd/:idUser",

    loader: async () => {
      try {
        await axios.get("http://localhost:8087/api/Cart/IsAuthed", {
          withCredentials: true,
        });
      } catch (error) {
        return redirect("/login");
      }
    },

    element: <ChoseAddr />,
  },
  { path: "/Singin", element: <SingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/Singin/valdtinSingin", element: <ValdtingSingIn /> },
  { path: "/confirmemail", element: <Confirmemal /> },
  { path: "/RePassword", element: <RePass /> },
  { path: "/login/confir2FA", element: <Confirm2FA /> },
  { path: "/home/ProductComparison", element: <MainPage /> },
]);
