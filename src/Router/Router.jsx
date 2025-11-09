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
        hydrateFallbackElement: <ArtworkDetailSkeleton></ArtworkDetailSkeleton>,
      },
      {
        path: "/add-artwork",
        element: (
          <PrivateRoute>
            <AddArtWork></AddArtWork>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", Component: ErrorPage },
]);
