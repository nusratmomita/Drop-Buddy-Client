import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Root from "../Root/Root";
import AuthRoot from "../Root/AuthRoot";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AreaCoverage from "../Pages/AreaCoverage/AreaCoverage";
import SendParcel from "../Pages/SendParcel/SendParcel";
import PrivateRoute from "../Pages/PrivateRoute/PrivateRoute";
import DashboardRoot from "../Root/DashboardRoot";
import MyParcels from "../Pages/DashboardPages/MyParcels";
import PaymentIntegration from "../Pages/DashboardPages/PaymentIntegration";
import PaymentHistory from "../Pages/DashboardPages/PaymentHistory";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/DashboardPages/PendingRiders";
import ActiveRiders from "../Pages/DashboardPages/ActiveRiders";
import MakeAdmin from "../Pages/DashboardPages/MakeAdmin";

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
            },
            {
                path: "/coverage",
                loader: () => fetch('./jsonData/warehouses.json'),
                Component: AreaCoverage
            },
            {
                path: "/beARider",
                loader: () => fetch('./jsonData/warehouses.json'),
                element: <PrivateRoute> <BeARider></BeARider> </PrivateRoute>
            },
            {
                path: "/sendParcel",
                loader: () => fetch('./jsonData/warehouses.json'),
                Component: SendParcel
            },
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
    },
    {
        path: "/dashboard",
        element: <PrivateRoute> <DashboardRoot></DashboardRoot> </PrivateRoute>,
        children: [
            {
                path: "/dashboard/myParcels",
                Component: MyParcels
            },
            {
                path: "/dashboard/paymentIntegration/:parcelId",
                Component: PaymentIntegration
            },
            {
                path: "/dashboard/paymentHistory",
                Component: PaymentHistory
            },
            {
                path: "/dashboard/pendingRiders",
                Component: PendingRiders
            },
            {
                path: "/dashboard/activeRiders",
                Component: ActiveRiders
            },
            {
                path: "/dashboard/makeAdmin",
                Component: MakeAdmin
            }
        ]
    }
])