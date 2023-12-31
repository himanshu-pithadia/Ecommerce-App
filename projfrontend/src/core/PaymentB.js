import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { cartEmpty } from "./helper/CartHelper";
import { getmeToken, processPayment } from "./helper/PaymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticatedUser, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, reload = undefined, setReaload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticatedUser() && isAuthenticatedUser().user.id;
  const token = isAuthenticatedUser() && isAuthenticatedUser().token;

  const gettoken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });

        signout(() => {
          return <Navigate to="/" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    gettoken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;

    products.map((p) => {
      amount = amount + parseInt(p.price);
    });

    return amount;
  };

  const onPurchase = () => {
    setInfo({loading: true})
    let nonce;
    let getNonce = info.instance.requestPaymentMethod()
    .then((data)=>{
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce:nonce,
        amount: getAmount()
      };

      processPayment(userId, token, paymentData)
      .then((response)=>{

        if(response.error){

          if(response.code=='1'){
            console.log("payment failed.")
            signout(()=>{
              return <Navigate to="/"/>
            })
          }

        }
        else
        {
          setInfo({
            ...info,
            success:response.success,
            loading: false
          })

          console.log("payment success");

          let product_names = "";
          
          products.forEach(function(item){

            product_names += item.name + ", ";
            
          });

          const orderData = {
            products: product_names,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          }

          createOrder(userId, token, orderData)
          .then((response)=>{

            if(response.error){
              if(response.code=='1'){
                console.log("ORDER FAILED");
              }

              signout(()=>{
                return <Navigate to="/"/>
              })
            }
            else
            {
              if(response.success==true){
                console.log("ORDER PLACED");
              }
            }
          })
          .catch((err)=>{
            setInfo({loading:false, success:false});
            console.log("order failed", err)
          })

          cartEmpty(()=>{
            console.log("cart emptyed out.")
          })

          setReaload(!reload);

        }
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log("NONCE",err))
  }

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            >
            </DropIn>
            <button onClick={onPurchase} className="btn btn-block btn-success">Buy Now</button>
          </div>
        ) : (
          <h3>please log in first or add products in cart.</h3>
        )}
        ;
      </div>
    );
  };

  return (
    <div>
      <h1>Your bill is $ {getAmount()}</h1>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;
