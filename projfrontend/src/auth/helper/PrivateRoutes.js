import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticatedUser } from './index';

const PrivateRoutes = () => {
	return isAuthenticatedUser() ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
