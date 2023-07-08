import { React, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { signout, isAuthenticatedUser } from "../auth/helper";

const Menu = ({ path }) => {
  let location = useLocation();

  const currentTab = (path) => {
    if (location.pathname === path) {
      return { color: "#2ecc72" };
    } else {
      return { color: "#FFFFFF" };
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <Link style={currentTab("/")} className="nav-link" to="/">
          Home
        </Link>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" style={currentTab("/cart")}>
            Cart
          </Link>
        </li>
        {isAuthenticatedUser() && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/user/dashboard"
              style={currentTab("/user/dashboard")}
            >
              Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticatedUser() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={currentTab("/signin")}
              >
                Signin
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={currentTab("/signup")}
              >
                Signup
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticatedUser() && (
          <li className="nav-item">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                signout(() => {
                  window.location.href = "/";
                });
              }}
              className="nav-link text-warning"
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
