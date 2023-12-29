import {Navigate, Route} from "react-router-dom";
import React from "react";
import {useAuth} from "./Auth/AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { token } = useAuth();
    if(token ===  null){
        return (<Navigate to="/login" />);
    }
};

export default PrivateRoute;
