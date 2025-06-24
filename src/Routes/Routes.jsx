import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Root from "../Root/Root";
import AuthRoot from "../Root/AuthRoot";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

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
    },
    {
        path: "/",
        Component: AuthRoot,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            }
        ]
    }
])