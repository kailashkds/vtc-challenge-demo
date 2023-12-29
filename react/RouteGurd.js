import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";
import Notes from "./Notes/Notes";
import React from 'react';
import LoginForm from "./User/Login";
import SignUpForm from "./User/SignUpForm";
import EmailConfirmation from "./User/EmailConfirmation";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./ProtectedRoute";


const Routes = () => {
    const { token } = useAuth();
    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/",
            element: <SignUpForm />,
        },
        {
            path: "/login",
            element: <LoginForm/>,
        },
        {
            path: "/confirmation/:token",
            element: <EmailConfirmation/>,
        },
        {
            path: "/notes",
            element: <PrivateRoute element={<Notes />} /> , // Wrap the component in ProtectedRoute
        }
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/notes",
            element: <Notes /> ,
        },
        {
            path: "/login",
            element: <LoginForm/>,
        },{
            path: "/",
            element: <SignUpForm />,
        },
        {
            path: "/confirmation/:token",
            element: <EmailConfirmation/>,
        }
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <LoginForm/>,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...(token !== null ? routesForAuthenticatedOnly : routesForPublic)
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;