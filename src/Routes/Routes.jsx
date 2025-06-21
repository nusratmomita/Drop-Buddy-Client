import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Root from "../Root/Root";

export const routers = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage/>,
        Component: Root,
        children: [
            {
                index: true,
                path: "/",
                Component: Home
            }
        ]
    }
])