import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin";
import Cart from "./core/Cart";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact Component={Home} />
        <Route path="/signup" exact Component={Signup}/>
        <Route path="/signin" exact Component={Signin}/>
        <Route path="/cart" exact Component={Cart}/>
        <Route element={<PrivateRoutes />}>
					<Route path="/user/dashboard" exact element={<UserDashboard />} />
				</Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
