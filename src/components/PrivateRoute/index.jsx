import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const userdata = JSON.parse(localStorage.getItem("userLogin"));

    if (userdata) {
        // var userLogin = true;
    } else {
        return <Navigate to="/login" />
    }

    return children;
};

export default PrivateRoute;
