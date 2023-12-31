import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import {isAuthenticatedUser} from '../auth/helper/index';

const Card = ({ product, addtoCart = true, removeFromCart = false, reload=undefined, setReload = (f) => f }) => {

  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "Default title";
  const cartDescription = product ? product.description : "default description";
  const cartPrice = product ? product.price : "Default Price";

  const addToCart = () => {


    if (isAuthenticatedUser()) {
      addItemToCart(product, ()=>setRedirect(true));
      console.log("Add to cart");
    } else {
      console.log("log in first");
    }
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product.id);
            setReload(!reload);
            console.log("remove from cart");
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
