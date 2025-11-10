import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import Login from "../components/Login/Login";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Register from "../components/Register/Register";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ArtworkDetail from "../components/ArtworkDetails/ArtworkDetails";
import ArtworkDetailSkeleton from "../components/ArtworkDetails/ArtworkDetailSkeleton";
import AddArtWork from "../components/AddArtWork/AddArtWork";
import AllartWork from "../components/AllartWork/AllartWork";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import GalleryPage from "../components/GalleryPage/GalleryPage";
import Favorites from "../components/Favourite/Favorite";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch(`${import.meta.env.VITE_Base_Url}/recentarts`),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/arts/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetail></ArtworkDetail>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_Base_Url}/arts/${params.id}`),
        hydrateFallbackElement: <LoadingPage></LoadingPage>,
      },
      {
        path: "/add-artwork",
        element: (
          <PrivateRoute>
            <AddArtWork></AddArtWork>
          </PrivateRoute>
        ),
      },
      {
        path: "/explore",
        Component: AllartWork,
      },
      {
        path: "/gallery",
        element: (
          <PrivateRoute>
            <GalleryPage></GalleryPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <Favorites></Favorites>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", Component: ErrorPage },
]);
