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
import AdminPrivateRoute from "../Pages/PrivateRoute/AdminPrivateRoute";
import ForbiddenAccess from "../Pages/ForbiddenAccess/ForbiddenAccess";

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
            {
                path: "/forbiddenRoute",
                Component: ForbiddenAccess
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
                element: <AdminPrivateRoute> <PendingRiders></PendingRiders> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/activeRiders",
                element: <AdminPrivateRoute> <ActiveRiders></ActiveRiders> </AdminPrivateRoute>
            },
            {
                path: "/dashboard/makeAdmin",
                // Component: MakeAdmin,
                element: <AdminPrivateRoute> <MakeAdmin></MakeAdmin></AdminPrivateRoute>
            }
        ]
    }
])